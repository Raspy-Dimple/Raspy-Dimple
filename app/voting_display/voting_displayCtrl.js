angular.module("App")
.controller("voting_displayCtrl", function($scope, $state, fireBaseFactory) {
  
  // get game from firebase to display question
  var game = fireBaseFactory.getGame();
  game.$loaded().then(function(data) {
    $scope.question = data.questions[data.currentRound];
    console.log("answers",data.answers);
    $scope.answers = data.answers;
  });

  $scope.toResultDisplay = function() {
    $state.go("result_display");
  };

});