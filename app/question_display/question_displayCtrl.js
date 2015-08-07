angular.module("App")
.controller("question_displayCtrl", function($scope, $state, fireBaseFactory) {
	// get question from firebase to display question
	// var game = fireBaseFactory.getGame();
	// var questions = game.questions;
	var timer = 30;

	setInterval(function() {
		$scope.sec = timer;
		timer--;
	}, 1000);

	var questions = {0: "question1", 1: "question2"};

	var questionIndex = 0;
	$scope.question = questions[questionIndex];
	questionIndex++;



	// countdown 30 sec
})