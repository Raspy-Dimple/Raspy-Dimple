angular.module('App')
  .controller('voting_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    $scope.answers = fireBaseFactory.getPlayerAnswers();
    
    game.$loaded()
      .then(function(data) {
        // if question happens to be written by the same person don't set the $scope.question to that element
        // maybe remove it
        $scope.question = data.questions[data.currentRound];
        $scope.currentRound = data.currentRound;
        // $scope.answers = removePlayerAnswer(data.answers);
      });

    $scope.chooseAnswer = function(playerKey) {
      // increment the current answers vote count
      fireBaseFactory.incrementPlayerScore(playerKey);
      $state.go('result_player');
    };

    $scope.filterPlayer = function(answer){
      // filter player's own answer so they can't vote for themselves
      return answer.playerKey !== playerKey;
    };

  });