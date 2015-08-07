angular.module("App")
.controller("question_displayCtrl", function($scope, $state, fireBaseFactory) {
	
	// get question from firebase to display question
	// var game = fireBaseFactory.getGame();
	// var questions = game.questions;

	var questions = {0: "question1", 1: "question2"};

	var questionIndex = 0;
	$scope.question = questions[questionIndex];
	questionIndex++;

	$scope.toVotingDisplay = function() {
		$state.go("voting_display");
	};

})