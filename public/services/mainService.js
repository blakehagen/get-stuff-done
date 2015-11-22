angular.module('getStuffDoneApp').service('mainService', function ($http, $q) {

    this.getTasks = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/tasks'
        }).then(function (response) {
            console.log(response);
            deferred.resolve(response.data)
        })
        return deferred.promise
    }




});