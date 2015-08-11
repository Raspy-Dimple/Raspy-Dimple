angular.module('App')
  .controller('result_playerCtrl', function($scope, $state, $interval, fireBaseFactory) {
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
    }

    // Setting up an interval to poll Firebase and see if
    // we can automatically change views yet.
    // Store interval promise so that we can destroy it once we're done.
    var intPlayerResultPromise = $interval(function() {
      $scope.curView = fireBaseFactory.getCurrentView();
      if ($scope.curView === 'question'){
        //console.log('Yaaaay');
        $interval.cancel(intPlayerResultPromise); // Destroy our interval, now that we no longer need it.
        $state.go('question_player');
      }
    },500,0);

  })