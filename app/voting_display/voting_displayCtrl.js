angular.module("App")
.controller("voting_displayCtrl", function($scope, $state, fireBaseFactory) {
  
  // get game from firebase to display question
  var game = fireBaseFactory.getGame();
  game.$loaded().then(function(data) {
    $scope.question = data.questions[data.currentRound];
  });

  $scope.toResultDisplay = function() {
    $state.go("result_display");
  };

});