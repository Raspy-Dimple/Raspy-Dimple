angular.module('App')
  .controller('result_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    var playerList = {}; // Store our player list.
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.answers = data.answers;
        //$scope.playerNames = data.players.
        console.log('DATA.PLAYERS ', data.players);
        playerList = data.players;
      });

    $scope.getPlayerName = function(playerKey) {
      console.log('Player Key Object: ', playerList[playerKey]);
      return playerList[playerKey].name;
    }

    setInterval(function() {
      game = fireBaseFactory.getGame();
      game.$loaded()
          .then(function(data) {
            $scope.answers = data.answers;
            $scope.$apply();
          })
      }, 2500);

  })