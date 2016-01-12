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
    $scope.dueByDay = false;
    $scope.dueByWeek = true;
    $scope.dueByMonth = true;
    
    $scope.postNew = function () {
        if ($scope.dueByDay === false) {
            $scope.dueBy = 'Day';
            $scope.dueDate = moment().endOf('day');
        } else if ($scope.dueByWeek === false) {
            $scope.dueBy = 'Week';
            $scope.dueDate = moment().endOf('week');
        } else {
            $scope.dueBy = 'Month'
            $scope.dueDate = moment().endOf('month');
        }

        var postNewObj = {
            name: $scope.newTask,
            userId: $scope.user,
            dueBy: $scope.dueBy,
            dueDate: $scope.dueDate,
            createdAt_nonRead: moment(),
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
    
    // SET DUE BY FIELD //
    $scope.selectDeadlineToggleDay = function () {
        $scope.dueByDay = false;
        $scope.dueByWeek = true;
        $scope.dueByMonth = true;
    };

    $scope.selectDeadlineToggleWeek = function () {
        $scope.dueByWeek = false;
        $scope.dueByDay = true;
        $scope.dueByMonth = true;
    };

    $scope.selectDeadlineToggleMonth = function () {
        $scope.dueByMonth = false;
        $scope.dueByDay = true;
        $scope.dueByWeek = true;
    };
    
    // FOLDER VIEWS & FILTER ON FOLDER CLICK //
    $scope.dayShow = false;
    $scope.weekShow = true;
    $scope.monthShow = true;

    $scope.filterProp = 'Day';

    $scope.showDayTasks = function () {
        $scope.dayShow = false;
        $scope.weekShow = true;
        $scope.monthShow = true;

        $scope.filterProp = 'Day';

        $scope.dueByDay = false;
        $scope.dueByWeek = true;
        $scope.dueByMonth = true;
    };

    $scope.showWeekTasks = function () {
        $scope.weekShow = false;
        $scope.monthShow = true;
        $scope.dayShow = true;

        $scope.filterProp = 'Week';

        $scope.dueByWeek = false;
        $scope.dueByDay = true;
        $scope.dueByMonth = true;
    };

    $scope.showMonthTasks = function () {
        $scope.monthShow = false;
        $scope.weekShow = true;
        $scope.dayShow = true;

        $scope.filterProp = 'Month';

        $scope.dueByMonth = false;
        $scope.dueByDay = true;
        $scope.dueByWeek = true;
    };

});