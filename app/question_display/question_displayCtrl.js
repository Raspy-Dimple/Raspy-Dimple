app.module("App")
.controller("question_displayCtrl", function($scope, $state, fireBaseFactory) {
	// get question from firebase to display question
	$scope.question = fireBaseFactory.getGame()
	// countdown 30 sec
})