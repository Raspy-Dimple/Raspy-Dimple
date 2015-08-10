angular.module('App')
  .controller('voting_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    $scope.answers = fireBaseFactory.getPlayerAnswers();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.currentRound = data.currentRound;
        // $scope.answers = fireBaseFactory.getPlayerAnswers();
      });

    $scope.chooseAnswer = function(playerKey) {
      // increment the current answers vote count
      fireBaseFactory.incrementPlayerScore(playerKey);
      $state.go('result_player');
    };
  });