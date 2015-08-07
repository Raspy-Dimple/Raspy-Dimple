angular.module("App")
.controller("homeCtrl", function($scope, $state, fireBaseFactory){
  // $scope.join = fireBaseFactory.joinGame("-Jw3HM066k7KPSn1RgKN", "Dave");
  // $scope.text = fireBaseFactory.createGame();
  console.log("in home ctrl");
  $scope.createGame = function(){
    fireBaseFactory.createGame();
    $state.go('create');
  };

});