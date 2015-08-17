angular.module("App")
.controller("homeCtrl", function($scope, $state, fireBaseFactory){
  $scope.createGame = function(){
    fireBaseFactory.createGame();
    $state.go('create');
  };

});