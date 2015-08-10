angular.module('App')
	.controller('final_result_playerCtrl', function($scope, $state, fireBaseFactory) {
		// get all players and compare score
		var game = fireBaseFactory.getGame();
		game.$loaded()
			.then(function(data) {
				var players = data.players;

				// find winner
				var highestVote = -1;
				var winner = "";
				for (var player in players) {
					console.log("player name: ", player.name)
					console.log("player name: ", player.votes)
					if (player.votes > highestVote) {
						highestVote = player.vote;
						winner = player.name;
					}
				}
				console.log("winner: ", winner);

				// find player
				var player = fireBaseFactory.getPlayer();

				console.log("current player info: ", player)
				// set verdict message
				if (player.name === winner) {
					$scope.verdict = "You Win!"
				} else {
					$scope.verdict = "You Lose!"
				}

			});

			$scope.toHome = function() {
			$state.go("home");
		}
	})