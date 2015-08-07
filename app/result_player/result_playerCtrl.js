angular.module('App')
  .controller('result_playerCtrl', function($scope, fireBaseFactory) {
    var game = fireBaseFactory.getGame();
    var playerKey = fireBaseFactory.getPlayerKey();
    
    game.$loaded()
      .then(function(data) {
        $scope.question = data.questions[data.currentRound];
        $scope.answers = data.answers;
      });
  })