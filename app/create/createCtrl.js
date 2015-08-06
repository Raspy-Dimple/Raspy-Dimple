// Create Controller will get the game
// Display the code for others to join the game
// Display all users current joined
// Contains a go button that will navigate the user to the next page, and set the join flag to false
angular.module("App")
.controller("createCtrl", ["$scope", "$state", "fireBaseFactory", function($scope, $state, fireBaseFactory){

  var game = fireBaseFactory.getGame();

  // display the code 
  $scope.code = game.$id;

  // display the players from the database
  $scope.players = game.players;

  $scope.toQuestionDisplay = function(){
    fireBaseFactory.setJoin(false, game.$id); // no more people can join the game
    $state.go("question_display"); // navigate to the question display page
  };

}]);
