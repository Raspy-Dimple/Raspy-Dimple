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
        $scope.players = data.players;
        $scope.timeLeft = fireBaseFactory.getTimeLeft();
      });

    var intPlayerVotingPromise = $interval(function() {
      $scope.curView = fireBaseFactory.getCurrentView();
      if ($scope.curView !== 'results'){
        $interval.cancel(intPlayerVotingPromise); // Destroy our interval, now that we no longer need it.
        $scope.toNextDisplay();
      }
    },250,0);

    // navigate to new question or to final result
    $scope.toNextDisplay = function() {
      if ($scope.currentRound >= fireBaseFactory.getEndRound()) {
        $state.go('final_result_player');
      } else {
        $state.go('question_player');
      }
    };

    // Setting up an interval to poll Firebase and see if
    // we can automatically change views yet.
    // Store interval promise so that we can destroy it once we're done.
    var intPlayerResultPromise = $interval(function() {
      $scope.curView = fireBaseFactory.getCurrentView();
      if ($scope.curView === 'question'){
        $interval.cancel(intPlayerResultPromise); // Destroy our interval, now that we no longer need it.
        $state.go('question_player');
      }
    },250,0);

  });
