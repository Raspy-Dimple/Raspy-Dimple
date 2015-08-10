angular.module('App')
  .controller('question_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        // get current round
        $scope.currentRound = data.currentRound;
        $scope.timeLeft = fireBaseFactory.getTimeLeft();
        // $scope.$watch('timeLeft', function(newVal, oldVal) {
        //   consolhe.log(newVal.$value);
        //   if(newVal === 1) {
        //     $scope.submitPlayerAnswer();
        //   }
        });

    $scope.submitPlayerAnswer = function(answer) {
      console.log(answer);
      console.log(game);
      var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
      ref.child('answers').child(playerKey).update({
        playerKey: playerKey,
        response: answer,
        votes: 0
      });
      $state.go('voting_player');
    };
  });