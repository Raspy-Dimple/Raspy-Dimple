// Create Controller will get the game
// Display the code for others to join the game
// Display all users current joined
// Contains a go button that will navigate the user to the next page, and set the join flag to false
angular.module("App")
.controller("createCtrl", [$scope, $state, "firebaseFactory", function($scope, $state, firebaseFactory){

  // get the game code to make sure it works
  var game = firebaseFactory.getGame();
  console.log(game);
  $scope.code = game.key();

  // must get the number of players to display
  $scope.players = game.players;

  $scope.toQuestionDisplay = function(){
    $state.go("question_display");
  };

}]);
