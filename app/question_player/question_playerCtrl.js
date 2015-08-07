angular.module('App')
  .controller('question_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    var currentRound = game.currentRound;
    
    // question_player will need to display the current question to the player
    $scope.question = game.questions[currentRound];

    // question_player will need to take the player's answer and add it to the
    // database
    $scope.submitPlayerAnswer = function(answer) {
      // check if answer
      if(game.playerAnswers === null) {
        
      }
    };
  });