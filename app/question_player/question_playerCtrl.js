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
      console.log(answer);
      console.log(game);
      var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
      console.log("before updating to have answers section");
      console.log("playerKey", playerKey);
      console.log("response", answer);
      if (answer !== undefined){
        ref.child('answers').child(playerKey).update({
          playerKey: playerKey,
          response: answer,
          votes: 0
        });
      }
      console.log("in submitPlayerAnswer");
      $state.go('voting_player');
    };
  });