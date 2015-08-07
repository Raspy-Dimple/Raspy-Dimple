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
        1: "What does JARVIS like to do on a Saturday night?",
        2: "What is JARVIS's favorite type of food?",
        3: "What is JARVIS's favorite animal?",
        4: "What does JARVIS think about in the shower?",
        5: "What is JARVIS's favorite song?",
        6: "Why did JARVIS fail clown school?",
        7: "What did JARVIS's parents say to them when they were born?",
        8: "What was JARVIS doing last night?",
        9: "This is JARVIS's favorite pickup line: _____________",
        10: "What is JARVIS's super power?"
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
    playerKey = newRef.child("players").push({name: name, votes: 0}).key();
    game = $firebaseObject(newRef);
    return game;
  };

  var getGame = function() {
    console.log("Game",game);
    return game;
  };

  var getPlayerKey = function() {
    return playerKey;
  };

  var setJoin = function(canJoin, id){
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + id);
    newRef.update({join: canJoin});
  };


  return {
    createGame: createGame,
    joinGame: joinGame,
    getGame: getGame,
    getPlayerKey: getPlayerKey,
    setJoin: setJoin,
  };
});