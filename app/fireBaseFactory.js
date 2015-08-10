angular.module("App")
.factory("fireBaseFactory", function($firebaseObject, $firebaseArray) {
  
  var ref = new Firebase("https://exposeyourself.firebaseio.com/games");
  var game = null;
  var playerKey = null;
  // var gameId = null;  might want if we want to listen for when a user is added rather than use setTimeOut in the createCtrl.js
  
  // Generate a random string of 5 characters that we will use for our game ID's.
   var createGameID = function () {
      var gameID = '';
      var validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

      for(var i = 0; i < 6; i++) {
        gameID += validChars.charAt(Math.floor(Math.random() * validChars.length));
      }

      //console.log(gameID);
      return gameID;
  };

  var createGame = function() {
    var gameObject = {
      join: true,
      currentRound: 1,
      timeLeft: 10,
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
    //game = $firebaseObject(ref.push(gameObject));
    var gameID = createGameID();
    console.log('Game ID: ', gameID);

    // Instantiate a new game with our newly generated short code ID.
    // Note: If we don't utilize a short code, and instead use the FireBase "push" method,
    // we end up with really long and unwieldy IDs that users will never type in.
    ref.child(gameID).set(gameObject);

    // Once we've instantiated the game, let's get the object back so we can utilize it.
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + gameID);
    game = $firebaseObject(newRef);
    return game;
  };

  var joinGame = function(id, name) {
    // Convert our ID to Upper Case since that's what's created by our short code generator.
    var id = id.toUpperCase(); 
    
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + id);
    // gameId = id; might want if we want to listen for when a user is added rather than use setTimeOut in the createCtrl.js
    playerKey = newRef.child("players").push({name: name, votes: 0}).key();
    game = $firebaseObject(newRef);
    return game;
  };

  var getGame = function() {
    //console.log("Game",game);
    return game;
  };

  var getPlayerKey = function() {
    return playerKey;
  };

  var setJoin = function(canJoin, id){
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + id);
    newRef.update({join: canJoin});
  };

  var incrementPlayerScore = function(playerKey) {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    ref.child('answers').child(playerKey).child('votes').transaction(function(currentVotes) {
      return ++currentVotes;
    });
    ref.child('players').child(playerKey).child('votes').transaction(function(currentVotes) {
      return ++currentVotes;
    });
  };

  var incrementRound = function() {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    ref.child('currentRound').transaction(function(currentRound) {
      return ++currentRound;
    })
  };

  var clearAnswers = function() {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    ref.child('answers').remove();
  };

  var getPlayerNames = function() {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    return $firebaseArray(ref.child('players'));
  };

  var getPlayerAnswers = function() {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    return $firebaseArray(ref.child('answers'));
  };

  var getTimeLeft = function() {
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    return $firebaseObject(ref.child('timeLeft'));
  };

  // Might want if we want to listen for when a user is added rather than use setTimeOut in the createCtrl.js
  // var playerAdded = function(cb){
  //   var playersRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + gameId + "/players");
  //   playersRef.on('child_added', function(childSnapshot, prevChildKey) {
  //     // code to handle new child.
  //     cb(childSnapshot);
  //   });
  // };

  var addQuestions = function() {
    var replaceName = function(string, replaceWith) {
      // replace 'JARVIS' with player name
      return string.replace('JARVIS', replaceWith);
    };
    var randomName = function(playersArray) {
      var randomNum = Math.floor(Math.random() * (playersArray.length));
      return playersArray[randomNum];
    };
    var shuffleQuestions = function(questionsArray) {
      for(var i = 0; i < questionsArray.length; i++) {
        var random = Math.floor(Math.random()*(questionsArray.length-i))+i;
        var temp = questionsArray[i];
        questionsArray[i] =  questionsArray[random];
        questionsArray[random] = temp;        
      }
      return questionsArray;
    };
    // get access to the names for the current game
    var ref = new Firebase('https://exposeyourself.firebaseio.com/players');
    ref.once('value', function(players) {
      var tempPlayers = ['jeff','tim','kate'];
      angular.forEach(players.val(), function(player) {
        tempPlayers.push(player.name);
      });
      var ref = new Firebase('https://exposeyourself.firebaseio.com/questionDB');
      ref.once('value', function(questions) {
        var tempQuestions = [];
        angular.forEach(questions.val(), function(question) {
          tempQuestions.push(question.question);
        });
        console.log(tempQuestions);
        console.log(tempPlayers);
        // add ten random questions and add a random name to each one where 'JARVIS' is located
        var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
        var counter = 1;

        var tempQuestions = shuffleQuestions(tempQuestions).slice(0,10);

        angular.forEach(tempQuestions, function(question) {
          if(counter < 10) {
            var tempQues = {};
            tempQues[counter] = replaceName(question, randomName(tempPlayers));
            ref.child('questions').update(tempQues);
            counter++;
          }
        });

      });
    });
  };



  // How to add questions from Google Sheet:
    // Step 1: use the 'toJSON' extension in our GoogleSheet to convert all the questions
    //         to JSON format.
    // Step 2: uncomment the code below
    // Step 3: copy the data from the results of the previous step and paste 
    //         the JSON data as the value of the 'QUESTIONS' variable below
    // Step 4: Enjoy the rest of your day. You're questions are added


  // var QUESTIONS = "ADD THE JSON DATA HERE";
  // var pushToFirebase = function(array) {
  //     var ref = new Firebase('https://exposeyourself.firebaseio.com/');
  //     for(var i = 0; i < array.length; i++) {
  //         ref.child('questionDB').push(array[i]);
  //     }
  // };
  // pushToFirebase(QUESTIONS);

  return {
    addQuestions: addQuestions,
    createGame: createGame,
    clearAnswers: clearAnswers,
    getGame: getGame,
    getPlayerKey: getPlayerKey,
    getPlayerAnswers: getPlayerAnswers,
    getPlayerNames: getPlayerNames,
    getTimeLeft: getTimeLeft,
    incrementPlayerScore: incrementPlayerScore,
    incrementRound: incrementRound,
    joinGame: joinGame,
    setJoin: setJoin  
  };
});