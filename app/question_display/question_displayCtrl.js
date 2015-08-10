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