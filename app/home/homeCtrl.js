angular.module("App")
.controller("homeCtrl", function($scope, $state, fireBaseFactory){
  // $scope.join = fireBaseFactory.joinGame("-Jw3HM066k7KPSn1RgKN", "Dave");
  // $scope.text = fireBaseFactory.createGame();
  $scope.routing = function(){
    fireBaseFactory.create();
    $state.go('create');
  };

});