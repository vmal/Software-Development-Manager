// declare the app with no dependencies
var myApp = angular.module('myApp', []);

myApp.factory('Data', function(){
    var data =
    {
        FirstName: ''
    };

    return {
        getFirstName: function () {
            return data.FirstName;
        },
        setFirstName: function (firstName) {
            data.FirstName = firstName;
        }
    };
});

myApp.controller('listController', function( $scope, Data ) {

    $scope.firstName = '';

    $scope.$watch('firstName', function (newValue, oldValue) {
        if (newValue !== oldValue) Data.setFirstName(newValue);
    });
});

myApp.controller('teamController', function( $scope, Data ){

    $scope.$watch(function () { return Data.getFirstName(); }, function (newValue, oldValue) {
        if (newValue !== oldValue) $scope.firstName = newValue;
    });
});