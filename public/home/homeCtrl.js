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


    // POST NEW TASK 
    $scope.postNew = function () {
        if ($scope.dueByDay === false) {
            $scope.dueBy = 'day';
        } else if ($scope.dueByWeek === false) {
            $scope.dueBy = 'week';
        } else {
            $scope.dueBy = 'month'
        }

        var postNewObj = {
            name: $scope.newTask,
            userId: $scope.user,
            dueBy: $scope.dueBy,
            createdAt: moment().format('ddd, MMM D YYYY, h:mma')
        };

        mainService.postTask(postNewObj).then(function (response) {
            console.log(response);
            $scope.taskData.push(response);
            $scope.newTask = '';
            $scope.dueByDay = false;
            $scope.dueByWeek = true;
            $scope.dueByMonth = true;
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
    
    // SET DUE BY FIELD //
    $scope.selectDeadlineToggleDay = function () {
        $scope.dueByDay = false;
        $scope.dueByWeek = true;
        $scope.dueByMonth = true;
        console.log('day: ', $scope.dueByDay);
        console.log('week: ', $scope.dueByWeek);
        console.log('month: ', $scope.dueByMonth);
    };

    $scope.selectDeadlineToggleWeek = function () {
        $scope.dueByWeek = false;
        $scope.dueByDay = true;
        $scope.dueByMonth = true;
        console.log('day: ', $scope.dueByDay);
        console.log('week: ', $scope.dueByWeek);
        console.log('month: ', $scope.dueByMonth);
    };

    $scope.selectDeadlineToggleMonth = function () {
        $scope.dueByMonth = false;
        $scope.dueByDay = true;
        $scope.dueByWeek = true;
        console.log('day: ', $scope.dueByDay);
        console.log('week: ', $scope.dueByWeek);
        console.log('month: ', $scope.dueByMonth);
    };


});