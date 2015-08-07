angular.module('App')
  .controller('voting_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.answers = data.answers;
      });

    $scope.chooseAnswer = function(playerKey) {
      // increment the current answers vote count
      fireBaseFactory.incrementPlayerScore(playerKey);
      $state.go('result_player');
    };

    setInterval(function() {
      game = fireBaseFactory.getGame();
      game.$loaded()
          .then(function(data) {
            $scope.answers = data.answers;
            $scope.$apply();
          })
      }, 2500);

  });