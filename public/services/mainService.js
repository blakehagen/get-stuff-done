angular.module('getStuffDoneApp').service('mainService', function ($http, $q) {

    // GET TASKS (READ)
    this.getTasks = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/tasks'
        }).then(function (response) {
            console.log(response.data);
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
            data: {
                name: newTask,
                createdAt: moment().format('ddd, MMM D YYYY, h:mma')
            }
        }).then(function (response) {
            console.log(response.data)
            deferred.resolve(response)
        })
        return deferred.promise
    }
    
    // DELETE TASK
    this.deleteTask = function (id) {
        var deferred = $q.defer()
        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/api/tasks/' + id
        }).then(function (response) {
            console.log(response.data)
            deferred.resolve(response)
        })
        return deferred.promise
    }
    
        // UPDATE TASK (EDIT)
    this.updateTask = function (id, editObj) {
        var deferred = $q.defer()
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/tasks/' + id,
            dataType: 'json',
            data: editObj
        }).then(function (response) {
            console.log(response.data);
            deferred.resolve(response)
        })
        return deferred.promise
    }





});