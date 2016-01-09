angular.module('getStuffDoneApp').controller('homeCtrl', function ($scope, $stateParams, mainService) {

    $scope.user = $stateParams.user;
    
    // TOGGLE DELETE OPTION //
    $scope.showDeleteOptions = function () {
        $scope.deleteOptions = !$scope.deleteOptions;
    };

    // GET CURRENT USER TASKS //
    $scope.tasks = function () {
        mainService.getTasks($scope.user).then(function (response) {
            $scope.taskData = response.tasks;
            $scope.name = response.name;
        })
    };

    $scope.tasks();
    
    // SET DUE BY //
    var dueBy;
    if($scope.day === 'true'){
        dueBy = 'day';
    }
    console.log(dueBy);

    // POST NEW TASK 
    $scope.postNew = function () {
        var postNewObj = {
            name: $scope.newTask,
            userId: $scope.user,
            dueBy: dueBy,
            createdAt: moment().format('ddd, MMM D YYYY, h:mma')
        };

        mainService.postTask(postNewObj).then(function (response) {
            $scope.taskData.push(response);
            $scope.newTask = '';
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

    $scope.selectDeadlineToggleDay = function () {
        $scope.day = !$scope.day;
        $scope.week = false;
        $scope.month = false;
    };

    $scope.selectDeadlineToggleWeek = function () {
        $scope.week = !$scope.week;
        $scope.day = false;
        $scope.month = false;
    };

    $scope.selectDeadlineToggleMonth = function () {
        $scope.month = !$scope.month;
        $scope.day = false;
        $scope.week = false;
    };


});