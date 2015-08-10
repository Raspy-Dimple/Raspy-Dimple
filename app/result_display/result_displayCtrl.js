angular.module("App")
.controller("result_displayCtrl", function($scope, $state, fireBaseFactory) {

	var game = fireBaseFactory.getGame();
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
			$state.go("final_result_display");
		} else { // else display_question
			fireBaseFactory.incrementRound();
			fireBaseFactory.clearAnswers();
			$state.go("question_display");
		}
		// $state.go("question_display");
	}

  setInterval(function() {
    game = fireBaseFactory.getGame();
    game.$loaded()
        .then(function(data) {
          $scope.answers = data.answers;
          $scope.$apply();
        })
    }, 2500);
})