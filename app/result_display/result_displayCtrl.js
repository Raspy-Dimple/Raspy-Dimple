angular.module("App")
.controller("result_display", function($scope, $state, fireBaseFactory) {

	var game = firebaseFactory.getGame();
	game.$loaded().then(function(data) {
		$scope.players = data.players;
		$scope.currentRound = data.currentRound;
		$scope.question = data.questions[currentRound];
	});

	// redirect to question_display
	$scope.toNextDisplay = function() {
	// if curr > 10, state to final result
		if ($scope.currentRound >= 10) {
			// have not decided on the win/lose page
		} else {// else display_question
			fireBaseFactory.incrementRound();
			$state.go("question_display");
		}
	} 
})