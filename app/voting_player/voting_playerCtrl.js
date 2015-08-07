angular.module('App')
  .controller('voting_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.answers = data.answers;
      });

    $scope.chooseAnswer = function(playerKey) {
      console.log(playerKey);
      // increment the current answers vote count
      fireBaseFactory.incrementPlayerScore(playerKey);
      // $state.go('voting_player');
    };


  })