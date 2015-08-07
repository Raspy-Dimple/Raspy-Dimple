angular.module('App')
  .controller('question_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
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