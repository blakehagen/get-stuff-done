angular.module('getStuffDoneApp').controller('homeCtrl', function ($scope, $stateParams, mainService) {
    
    // Toggle Delete Options //
    $scope.showDeleteOptions = function () {
        $scope.deleteOptions = !$scope.deleteOptions;
    }

    // Populate Current User Tasks //
    $scope.tasks = function () {
        mainService.getTasks($stateParams.user).then(function (response) {
            // console.log(response);
            $scope.taskData = response.tasks;
            $scope.name = response.name;
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
            $scope.newTask = '';
            // $scope.inputToggle();
        })
    };

    // MARK TASK AS COMPLETED OR NOT COMPLETED
    $scope.completed = function (id, status, thisBox) {
        var newStatus;
        if (status === 'not-completed' || undefined) {
            newStatus = 'completed';
        } else if (status === 'completed') {
            newStatus = 'not-completed';
        }
        var completedObj = {
            status: newStatus
        };
        mainService.updateTask(id, completedObj).then(function (response) {
            for (var i = 0; i < $scope.taskData.length; i++) {
                if ($scope.taskData[i].name === response.name) {
                    $scope.taskData[i].status = response.status;
                }
            }
            // console.log(response.status);
        })
    };
    
    // DELETE TASK 
    $scope.deleteTask = function (id) {
        var delObj = {
            id: id,
            userId: $scope.user
        }
        mainService.deleteTask(delObj).then(function (response) {
            $scope.tasks();
        })
    };

    // DELETE ALL COMPLETED TASKS //
    $scope.deleteAllCompleted = function () {
        mainService.deleteCompletedTasks($scope.user).then(function (response) {
            console.log(response);
            $scope.tasks();
        })
    };


});