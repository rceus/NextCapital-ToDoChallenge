var todoApp = angular.module("todoApp", ['ui.sortable']);

todoApp.controller('todoController', function todoController($scope) {
	$scope.items = [{ name: 'Photo Gallery', status: 'inProgress'}, 
									{ name: 'To Do List', status: 'inProgress'}, 
									{ name: 'Contacts List', status: 'inProgress'}];

  $scope.sortableOptions = {
    //update: function(e, ui) {},
    axis: 'x'
  };
	$scope.saveItem = function() {
		if($scope.addText != "") {
			$scope.items.push({name: $scope.addText, status: 'inProgress'});
			$scope.addText = "";
		}
	};
	$scope.removeItem = function() {
		var index = findIndex(this.item);
		if (index > -1) {
			$scope.items.splice(index, 1);
		}
	};
	$scope.editItem = function() {
		if ($scope.items[this.$index].editMode === "edit")
			$scope.items[this.$index].editMode = "";
		else 
			$scope.items[this.$index].editMode = "edit";
	};
	$scope.pickIcon = function() {
		var index = findIndex(this.item);
		if (index > -1) {
			if ($scope.items[index].status == 'inProgress') {
				return "fa fa-fw fa-square-o";
			} else {
				return "fa fa-fw fa-check-square-o";
			}
		}	
	};
	$scope.sortItems = function() {

	}
	$scope.setCompletion = function() {
		if (this.item.status === 'inProgress')
			this.item.status = 'completed';
		else
			this.item.status = 'inProgress';
	};
	var findIndex = function(item) {
		return $scope.items.indexOf(item);
	};
});