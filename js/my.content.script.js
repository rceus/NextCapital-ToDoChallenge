'use strict';

var myAppModule = angular.module('main', ['ui.sortable'])

function TodoCtrl($scope)
{    
	/*
		Use a variable to switch layouts
		1. To Do App
		2. To Do List
	*/
	$scope.layout = 1;
	$scope.items = [];
	$scope.currUser;
	
	$scope.$watch('layout', function(){
		if($scope.layout===1)
		{
			//console.log("1 works");
			$('#todoapp').removeClass('rem');
			$('#todolist').addClass('rem');
		}
		else if($scope.layout===2)
		{
			//console.log("2 works");
			$scope.loadTodos();
			$('#todolist').removeClass('rem');
			$('#todoapp').addClass('rem');
		}
	});

	/*
		Back Button Function
	*/
	$scope.goBackFromList = function(){
		$('#todoapp').removeClass('rem');
		$('#todolist').addClass('rem');
		location.reload();
	}

	/*
		Mark All As Read
	*/
	$scope.toggleMarkAll = function() {
      	$scope.items.forEach(function(item) {      
			Todo.updateTodo({
	      		todoId: item.id,
	      		data: { is_complete: true },
	      		success: function(todo) 
	      		{ 
	      			$scope.loadTodos();
	      		},
	      		error:   function(xhr)  { alert('todo update error!') }
	    	});
      	});
  	};


	/*
		Total Todos
	*/
	$scope.getTotalTodos = function () {
	    return $scope.items.length;
	  };

	/*
		Starting the Session
	*/
	$scope.startSession = function(){
		Todo.startSession({
			email: $scope.emailInput,
			password: $scope.passwordInput, 
			success: function(user){
				alert("Login Successful. Re-directing to Todos!");
				$scope.layout = 2;
				$scope.currUser=user;
				$scope.$apply();
			}, 
			error: function(xhr){alert('Login Failed')}
		});
	}

	/*
		Creating a new user
	*/

	$scope.createUser = function(){
		Todo.createUser({
			email:    $scope.emailInput,
    		password: $scope.passwordInput,
    		success:  function(user) 
    		{ 
    			alert('Account Created. Re-directing to Todos!') 
    			$scope.layout = 2;
    			$scope.currUser=user;
				$scope.$apply();
    		},
    		error: function(xhr){ alert('Denied!') }
		});
	}

	/*
		Updating a todo
	*/

	$scope.updateTodo = function(item){
		Todo.updateTodo({
      		todoId: item.id,
      		data: { is_complete: !item.is_complete },
      		success: function(todo) 
      		{ 
      			//alert('Todo update success!') 
      		},
      		error:   function(xhr)  { alert('todo update error!') }
    	});
	}

	/*
		Loading a todo
	*/

	$scope.loadTodos = function(){
		Todo.USER = $scope.currUser;

	    Todo.loadTodos({
      		success: function(todos) 
      		{ 
      			//alert('Loading Todos!') 
    			$scope.layout = 2;
    			$scope.items = todos;
				$scope.$apply();
      		},
      		error: function(xhr){ alert('Load Error!') }
    	});
    }

	/*
		Creating a todo
	*/

	$scope.createTodo = function(){
		Todo.USER = $scope.currUser;
		var todo = {};
		console.log($scope.createMe);
		todo.description = $scope.createMe;
		$scope.createMe = null
		Todo.createTodo({
			todo:todo,
			success: function(todo)
			{
				$scope.loadTodos();
			},
      		error: function(xhr){ alert('Create Error!') }

		}); 
	}

	$scope.clearTodos = function(){
		Todo.USER = $scope.currUser;
		Todo.loadTodos({
      		success: function(nulltodos) 
      		{ 
      			alert('Clearing Screen!') 
    			$scope.layout = 2;
    			$scope.items = null;
				$scope.$apply();
      		},
      		error: function(xhr){ alert('Clear Screen Error!') }
    	});
	}
}