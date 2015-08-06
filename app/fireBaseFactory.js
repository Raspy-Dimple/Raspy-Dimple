angular.module("App")
.factory("fireBaseFactory", function($firebaseObject) {
  
  var ref = new Firebase("https://exposeyourself.firebaseio.com/games");
  var game = null;
  var playerKey = null;
  var createGame = function() {
    var gameObject = {
      join: true,
      currentRound: 1,
      questions: {
        1: "question1",
        2: "question2"
      }
    };
    game = $firebaseObject(ref.push(gameObject));
    return game;
  };
  // var id = "-Jw3HM066k7KPSn1RgKN"

  var joinGame = function(id, name) {
    // return ref.equalTo("Jw3HM066k7KPSn1RgKN").on("value", function(snapShot) {
    //   console.log(snapShot.val());
    // });
    // hard code the game ref in url
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + id);
    playerKey = newRef.child("players").push({name: name}).key();
    game = $firebaseObject(newRef);
    return game;
  };

  var getGame = function() {
    return game;
  };

  var getPlayerKey = function() {
    return playerKey;
  };

  return {
    createGame: createGame,
    joinGame: joinGame,
    getGame: getGame,
    getPlayerKey: getPlayerKey
  };
});