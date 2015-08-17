angular.module('App')
	.controller('final_result_playerCtrl', function($scope, $state, $firebaseObject, fireBaseFactory) {
		// get all players and compare score
		var game = fireBaseFactory.getGame();
		var playerKey = fireBaseFactory.getPlayerKey();
		var currPlayer = null;
		var highestVote = 0;
		var winner = "";

		game.$loaded()
			.then(function(data) {
				var players = data.players;

				angular.forEach(players, function(player) {
					if (player.votes > highestVote) {
						highestVote = player.votes;
						winner = player.name;
					}
				});

				currPlayer = players[playerKey].name;

				// set verdict message
				if (currPlayer === winner) {
					$scope.verdict = "You Win!"
				} else {
					$scope.verdict = "You Lose!"
				}

			});

			$scope.toHome = function() {
			$state.go("home");
		}
	})