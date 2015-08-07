angular.module('App')
  .controller('question_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
      });

    // question_player will need to take the player's answer and add it to the
    // database
    $scope.submitPlayerAnswer = function(answer) {
      console.log(answer);
      console.log(game);
      var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
      ref.child('answers').child(playerKey).update({response: answer});
    };
  });