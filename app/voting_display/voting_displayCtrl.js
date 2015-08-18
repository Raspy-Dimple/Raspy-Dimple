angular.module("App")
.controller("voting_displayCtrl", function($scope, $state, $interval, fireBaseFactory) {
  
  // get game from firebase to display question
  var game = fireBaseFactory.getGame();
  game.$loaded().then(function(data) {
    $scope.question = data.questions[data.currentRound];
    $scope.currentRound = data.currentRound;
    $scope.answers = data.answers;
  });

  fireBaseFactory.getTimeLeft().$bindTo($scope,'timeLeft');

  // for moving on to the next screen
  var intQuestionPromise = $interval(function() {
    $scope.timeLeft.$value--;
    if ($scope.timeLeft.$value <= 0){
      $interval.cancel(intQuestionPromise); // Cancel the interval once we're done with it.
      fireBaseFactory.resetTimeLeft();
      fireBaseFactory.updateCurrentView('results'); // Force client to update!
      $scope.toResultDisplay(); // Host view will update!
    }
  },1000, fireBaseFactory.getGameTime());

  // I think we need this to populate our answers.
  setInterval(function() {
    game = fireBaseFactory.getGame();
    game.$loaded()
        .then(function(data) {
          $scope.answers = data.answers;
          $scope.$apply();
        })
    }, 1500);

  $scope.toResultDisplay = function() {
    fireBaseFactory.updateCurrentView('results');
    $state.go("result_display");
  };

});