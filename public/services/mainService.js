angular.module('getStuffDoneApp').service('mainService', function ($http, $q) {

    // GET TASKS
    this.getTasks = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/tasks'
        }).then(function (response) {
            deferred.resolve(response.data)
        })
        return deferred.promise
    }
    
    // CREATE NEW TASK
    this.postTask = function (newTask) {
        var deferred = $q.defer()
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/tasks',
            dataType: 'json',
            data: { name: newTask }
        }).then(function (response) {
            console.log('New Task Added');
            deferred.resolve(response)
        })
        return deferred.promise
    }





});