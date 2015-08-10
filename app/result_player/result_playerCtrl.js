angular.module('App')
  .controller('result_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    var playerList = {}; // Store our player list.
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.answers = data.answers;
        // get current round
        $scope.currentRound = data.currentRound;
        //$scope.playerNames = data.players.
        console.log('DATA.PLAYERS ', data.players);
        playerList = data.players;
      });

    $scope.getPlayerName = function(playerKey) {
      console.log('Player Key Object: ', playerList[playerKey]);
      return playerList[playerKey].name;
    }

    $scope.answers = fireBaseFactory.getPlayerAnswers();
  })