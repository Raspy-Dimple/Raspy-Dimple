angular.module("App")
.controller("homeCtrl", function($scope, fireBaseFactory){
  $scope.text = fireBaseFactory;
});