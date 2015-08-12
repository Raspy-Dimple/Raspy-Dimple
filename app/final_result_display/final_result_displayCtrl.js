angular.module("App")
	.controller("final_result_displayCtrl", function($scope, $state, fireBaseFactory) {
		$scope.players = fireBaseFactory.getPlayerNames();
		$scope.toHome = function() {
			$state.go("home");
		};
	})