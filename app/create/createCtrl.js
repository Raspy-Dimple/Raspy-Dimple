// Create Controller will get the game
// Display the code for others to join the game
// Display all users current joined
// Contains a go button that will navigate the user to the next page, and set the join flag to false
angular.module("App")
.controller("createCtrl", ["$scope", "$state", "fireBaseFactory", function($scope, $state, fireBaseFactory){

  console.log("fireBaseFactory", fireBaseFactory);
  var game = fireBaseFactory.getGame();

  // get the game code to make sure it works
  console.log("KEY", game.$id);
  $scope.code = game.$id;

  // must get the number of players to display
  $scope.players = game.players;

  $scope.toQuestionDisplay = function(){
    game.
    $state.go("question_display");
  };

}]);
