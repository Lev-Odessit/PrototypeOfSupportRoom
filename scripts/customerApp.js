(function() {
    var app = angular.module('customerApp', []);

    app.controller('BodyController', function($scope, $http) {

        $http.get('data/customer.json').
            success(function(data) {
                $scope.customer = data;
            }).
            error(function(data) {
                console.log('Error in BodyController connection to customer.json;');
            });

        $http.get('data/requests.json').
            success(function(data) {
                $scope.requests = data;
            }).
            error(function(data) {
                console.log('Error in BodyController connection to requests.json;');
            });

        $http.get('data/removedRequests.json').
            success(function(data) {
                $scope.removedRequests = data;
            }).
            error(function(data, status, headers, config) {
                console.log('Error in BodyController connection to removedRequests.json;');
            });

    });

    app.controller("TabController", function() {
        this.tab = 1;

        this.isSet = function(checkTab) {
            return this.tab === checkTab;
        };

        this.setTab = function(setTab) {
            this.tab = setTab;
        };
    });

    app.controller("RequestsController", function($scope){

        this.request = {};

        this.addRequest = function(){
            this.request.createdOn = Date.now();
            $scope.requests.push(this.request);
            this.request = {};
        };

    });

    app.controller("CreatedRequestsController", function($scope){

        this.deleteRequest = function( index ) {

            var deletedObject = $scope.requests.splice( index, 1 );
            $scope.removedRequests.push(deletedObject[0]);

        }

    });

    app.controller("RemovedRequestsController", function($scope){

        this.restoreRequest = function(index){

            var restoreObject = $scope.removedRequests.splice( index, 1 );
            $scope.requests.push(restoreObject[0]);

        };

    });

})();