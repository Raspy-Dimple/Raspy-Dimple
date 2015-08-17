angular.module('App')
  .controller('voting_playerCtrl', function($scope, $state, $interval, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    $scope.answers = fireBaseFactory.getPlayerAnswers();

    // This freezes the player on their current view
    // after they've submitted their answer.
    // Changes to true on submit and display a
    // "WAITING FOR OTHER PLAYERS TO VOTE" div.
    $scope.holdView = false;
    
    game.$loaded()
      .then(function(data) {
        // if question happens to be written by the same person don't set the $scope.question to that element
        // maybe remove it
        $scope.question = data.questions[data.currentRound];
        $scope.currentRound = data.currentRound;
        $scope.timeLeft = fireBaseFactory.getTimeLeft();
      });

    // Setting up an interval to poll Firebase and see if
    // we can automatically change views yet.
    // Store interval promise so that we can destroy it once we're done.
    var intPlayerVotingPromise = $interval(function() {
      $scope.curView = fireBaseFactory.getCurrentView();
      if ($scope.curView !== 'voting'){
        $interval.cancel(intPlayerVotingPromise); // Destroy our interval, now that we no longer need it.
        $state.go('result_player');
      }
    },250,0);

    $scope.chooseAnswer = function(playerKey) {
      // increment the current answers vote count
      $scope.holdView = true;
      fireBaseFactory.incrementPlayerScore(playerKey);
    };

    $scope.filterPlayer = function(answer){
      // filter player's own answer so they can't vote for themselves
      return answer.playerKey !== playerKey;
    };

  });