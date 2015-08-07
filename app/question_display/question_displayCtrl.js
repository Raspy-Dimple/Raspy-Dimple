angular.module("App")
.controller("question_displayCtrl", function($scope, $state, fireBaseFactory) {
	
	// get question from firebase to display question
	var game = fireBaseFactory.getGame();
	// console.log("question display game",game)

	game.$loaded().then(function(data) {
		$scope.question = data.questions[data.currentRound];
	});

	$scope.toVotingDisplay = function() {
		$state.go("voting_display");
	};

})