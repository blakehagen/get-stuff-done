angular.module('getStuffDoneApp').controller('homeCtrl', function ($scope, $stateParams, mainService) {

    // Show Type-Animated Box and Hide Input Box //
    $scope.taskAnimateBox = true;
    $scope.inputBox = false;

    $scope.inputToggle = function () {
        $scope.inputBox = !$scope.inputBox;
        $scope.taskAnimateBox = !$scope.taskAnimateBox;
    }

    // Populate Current User Tasks //
    $scope.tasks = function () {
        mainService.getTasks($stateParams.user).then(function (response) {
            $scope.taskData = response.tasks;
            // console.log('taskData', $scope.taskData);
            $scope.user = $stateParams.user;
        })
    };
    
    // GET USER/TASKS
    $scope.tasks();

    // POST NEW TASK 
    $scope.postNew = function () {
        var postNewObj = {
            name: $scope.newTask,
            userId: $scope.user,
            createdAt: moment().format('ddd, MMM D YYYY, h:mma')
        };
        
        mainService.postTask(postNewObj).then(function (response) {
            $scope.taskData.push(response);
            // $scope.tasks();
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
        var delObj = {
            id: id,
            userId: $scope.user
        }
        mainService.deleteTask(delObj).then(function (response) {
            console.log('del response ', response);
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