angular.module('App')
  .controller('result_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    var playerList = {}; // Store our player list.
    $scope.answers = fireBaseFactory.getPlayerAnswers();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        // get current round
        $scope.currentRound = data.currentRound;
        //$scope.playerNames = data.players.
        console.log('DATA.PLAYERS ', data.players);
        playerList = data.players;
      });

    $scope.getPlayerName = function(playerKey) {
      console.log('Player Key Object: ', playerList[playerKey]);
      return playerList[playerKey].name;
    };

    // navigate to new question or to final result
    $scope.toNextDisplay = function() {
      if ($scope.currentRound >= 10) {
        $state.go('final_result_player');
      } else {
        $state.go('question_player')
      }
    };
  })
