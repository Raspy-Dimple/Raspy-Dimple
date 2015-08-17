angular.module("App")
.controller("result_displayCtrl", function($scope, $state, $interval, fireBaseFactory) {

  $scope.answers = fireBaseFactory.getPlayerAnswers();

	var game = fireBaseFactory.getGame();
	game.$loaded().then(function(data) {
		$scope.currentRound = data.currentRound;
		$scope.question = data.questions[data.currentRound];
		$scope.players = data.players;
	});

	fireBaseFactory.getTimeLeft().$bindTo($scope,'timeLeft');

	var intQuestionPromise = $interval(function() {
		$scope.timeLeft.$value--;
		if ($scope.timeLeft.$value <= 0){
			$interval.cancel(intQuestionPromise); // Cancel the interval once we're done with it.
			fireBaseFactory.updateCurrentView('nextDisplay'); // Force client to update!
			fireBaseFactory.resetTimeLeft();
			$scope.toNextDisplay(); // Host view will update!
		}
	},1000, fireBaseFactory.getGameTime());

	// redirect to question_display
	$scope.toNextDisplay = function() {
		if ($scope.currentRound >= fireBaseFactory.getEndRound()) {
			$state.go("final_result_display");
		} else { // else display_question
			fireBaseFactory.incrementRound();
			fireBaseFactory.clearAnswers();
			fireBaseFactory.updateCurrentView('question');
			$state.go("question_display");
		}
	};
});