angular.module("App")
.controller("result_displayCtrl", function($scope, $state, fireBaseFactory) {

	var game = fireBaseFactory.getGame();
	console.log("result display game: ", game);
	game.$loaded().then(function(data) {
		$scope.answers = data.answers;
		$scope.currentRound = data.currentRound;
		$scope.question = data.questions[data.currentRound];
		$scope.players = data.players;
	});

	// redirect to question_display
	$scope.toNextDisplay = function() {
		// if curr > 10, state to final result
		if ($scope.currentRound >= 10) {
			// have not decided on the win/lose page
		} else { // else display_question
			fireBaseFactory.incrementRound();
			$state.go("question_display");
		}
		$state.go("question_display");
	} 
})