angular.module("App")
	.controller("final_result_displayCtrl", function($scope, $state, fireBaseFactory) {
		var game = fireBaseFactory.getGame();
		game.$loaded().then(function(data) {
			$scope.players = data.players;
		});
		$scope.toHome = function() {
			$state.go("home");
		}
	})