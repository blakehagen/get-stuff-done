angular.module('getStuffDoneApp').controller('homeCtrl', function ($scope, mainService) {

    // Show Type-Animated Box and Hide Input Box //
    $scope.taskAnimateBox = true;
    $scope.inputBox = false;

    $scope.inputToggle = function () {
        $scope.inputBox = !$scope.inputBox;
        $scope.taskAnimateBox = !$scope.taskAnimateBox;
    }

    // Populate Current Tasks //
    $scope.tasks = function () {
        mainService.getTasks().then(function (response) {
            $scope.taskData = response;
        })
    };
    
    // GET TASKS
    $scope.tasks();

    // POST NEW TASK 
    $scope.postNew = function () {
        mainService.postTask($scope.newTask).then(function (response) {
            $scope.tasks();
            $scope.newTask = '';
            $scope.inputToggle();
        })
    }
    
    // TOGGLE ITEM BUTTONS
    $scope.showButtons = function (item) {
        item.itemButtons = true;
    }

    $scope.hideButtons = function (item) {
        item.itemButtons = false;
    }
    
    // DELETE TASK 
    $scope.removeTask = function (id) {
        mainService.deleteTask(id).then(function (response) {
            $scope.tasks();
        })
    }
    
    // EDIT TASK 
    $scope.editTask = function (id, updatedTask) {
        var editObj = {
            name: updatedTask
        }
        mainService.updateTask(id, editObj).then(function (response) {
            $scope.tasks();
        })
    }
    // EDIT TASK FIELD TOGGLE
    $scope.showEditField = function (item) {
        item.editField = !item.editField;
        item.taskName = !item.taskName;
    }








})