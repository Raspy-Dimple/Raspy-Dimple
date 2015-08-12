angular.module('App')
  .controller('question_playerCtrl', function($scope, $state, $timeout, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();


    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        // get current round
        $scope.currentRound = data.currentRound;
        $scope.timeLeft = fireBaseFactory.getTimeLeft();
      });

    $scope.$watch('timeLeft.$value', function(newVal, oldVal) {
      console.log("newVal", newVal);
      if(newVal === 2) {
        console.log("in equals of watch");
        $scope.submitPlayerAnswer();
      }
    });


    $scope.submitPlayerAnswer = function(answer) {
      var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
      if ($scope.answer !== undefined){
        answer = $scope.answer;
        ref.child('answers').child(playerKey).update({
          playerKey: playerKey,
          response: answer,
          votes: 0
        });
      }
      $state.go('voting_player');
    };
  });