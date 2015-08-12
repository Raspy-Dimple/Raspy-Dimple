angular.module("App")
.controller("result_displayCtrl", function($scope, $state, fireBaseFactory) {

  $scope.answers = fireBaseFactory.getPlayerAnswers();

	var game = fireBaseFactory.getGame();
	game.$loaded().then(function(data) {
		$scope.currentRound = data.currentRound;
		$scope.question = data.questions[data.currentRound];
		$scope.players = data.players;
	});

	// redirect to question_display
	$scope.toNextDisplay = function() {
		// if curr > 10, state to final result
		if ($scope.currentRound >= 10) {
			$state.go("final_result_display");
		} else { // else display_question
			fireBaseFactory.incrementRound();
			fireBaseFactory.clearAnswers();
			fireBaseFactory.updateCurrentView('question');
			$state.go("question_display");
		}
	}
})