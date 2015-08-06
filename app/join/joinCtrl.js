angular.module("App")
.controller("joinCtrl", function($scope, $state, fireBaseFactory){
  //$scope.join = fireBaseFactory.joinGame("-Jw3HM066k7KPSn1RgKN", "Dave");
  //$scope.text = fireBaseFactory.createGame();
  $scope.join = {};

  $scope.go = function() {
    console.log($scope.join.code + ' & ' + $scope.join.name);
    fireBaseFactory.joinGame($scope.join.code, $scope.join.name);
    $state.go('question_player'); 
  }

});