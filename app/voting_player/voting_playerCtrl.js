angular.module('App')
  .controller('voting_playerCtrl', function($scope, $state, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    $scope.answers = fireBaseFactory.getPlayerAnswers();
    
    game.$loaded()
      .then(function(data) {
        // if question happens to be written by the same person don't set the $scope.question to that element
        // maybe remove it
        $scope.question = data.questions[data.currentRound];
        $scope.currentRound = data.currentRound;
        console.log("Answers",data.answers);
        $scope.answers = data.answers;
        $scope.answers = removePlayerAnswer(data.answers);
      });

    $scope.chooseAnswer = function(playerKey) {
      // increment the current answers vote count
      fireBaseFactory.incrementPlayerScore(playerKey);
      $state.go('result_player');
    };

    var removePlayerAnswer = function(answers){
      var newAnswers = [];
      for (answer in answers){
        if (answer[playerKey] !== playerKey){
          newAnswers.push(answer);
        }
      }
      return newAnswers;
    };
  });