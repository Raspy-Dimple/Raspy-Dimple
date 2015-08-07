angular.module("App")
.controller("result_display", function($scope, $state, firebaseFactory) {
	
	// get game from firebase to display question
	var currentRound;

	var game = firebaseFactory.getGame();
	game.$loaded().then(function(data) {
		$scope.players = data.players;
		currentRound = data.currentRound;
		$scope.question = data.questions[currentRound];
	});

	// redirect to question_display
	$scope.toNextDisplay = function() {
		if (currentRound > 10) {
			// have not decided on the win/lose page
		} else {
			$state.go("question_display");
			currentRound++;
		}
	} 
	// if curr > 10, state to final result
	// else display_question
	// round++
})