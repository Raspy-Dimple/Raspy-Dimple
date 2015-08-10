angular.module("App")
.controller("question_displayCtrl", function($scope, $state, $interval, fireBaseFactory) {
	
	// get game from firebase to display question
	var game = fireBaseFactory.getGame();
	game.$loaded().then(function(data) {
		// get current round
		$scope.currentRound = data.currentRound;
		$scope.question = data.questions[data.currentRound];
	});

	// fireBaseFactory.getTimeLeft().$bindTo($scope,'timeLeft');


	// $interval that will count down from 30 seconds
	// when time is up, it will call 'toVotingDisplay'


	// Storing our interval's promise as a variable so that we can explicitly cancel it later.
	// Otherwise, it will keep running until it's done.
	var intQuestionPromise = $interval(function() {
		$scope.timeLeft.$value--;
		if ($scope.timeLeft.$value === 0){
			$interval.cancel(intQuestionPromise); // Cancel the interval once we're done with it.
			$scope.toVotingDisplay();
		}
	},1000,10);
	// $interval(function() {
	// 	$scope.timeLeft.$value--;
	// 	if ($scope.timeLeft.$value === 0){
	// 		$scope.toVotingDisplay();
	// 	}
	// },1000,10);

	$scope.toVotingDisplay = function() {
		$state.go("voting_display");
	};

});