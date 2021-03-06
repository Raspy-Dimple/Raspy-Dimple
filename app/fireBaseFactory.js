angular.module("App")
.factory("fireBaseFactory", function($firebaseObject, $firebaseArray) {
  
  var ref = new Firebase("https://exposeyourself.firebaseio.com/games");
  var game = null;
  var playerKey = null;
  var TIME_LEFT = 15;
  var END_ROUND = 10;
  
  // Generate a random string of 5 characters that we will use for our game ID's.
   var createGameID = function () {
      var gameID = '';
      var validChars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ123456789';

      for(var i = 0; i < 6; i++) {
        gameID += validChars.charAt(Math.floor(Math.random() * validChars.length));
      }

      return gameID;
  };


  var createGame = function() {
    var gameObject = {
      join: true,
      active: false,
      currentRound: 1,
      currentView: 'question',
      timeLeft: TIME_LEFT,
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
    var gameID = createGameID();

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
    playerKey = newRef.child("players").push({name: name, votes: 0}).key();
    game = $firebaseObject(newRef);
    return game;
  };

  // Check if the HOST has put the game into an active state.
  // If not, force the player / client to wait on their current screen.
  var checkActive = function(id) {
    if (id === undefined) { return; } // Prevent errors if ID is null.
    var id = id.toUpperCase();
    var activeGame;

    // Query our current game ID to find out if the game is in an active state.
    // This query method can be found here: https://www.firebase.com/blog/2013-10-01-queries-part-one.html#byid
    new Firebase("https://exposeyourself.firebaseio.com/games/" + id + "/active").once('value', function(data) {
      activeGame = data.val();
    });

    // Return the state of our game to the controller.
    return activeGame;
  };

  // This method is called by each player view to find out if it's okay
  // to move onto the next view. This acts as a gate so that players aren't
  // able to move ahead or go out of sync with the game.
  var getCurrentView = function() {
    var curView;
    // Query game to find out if the game is in an active state.
    // This query method can be found here: https://www.firebase.com/blog/2013-10-01-queries-part-one.html#byid
    new Firebase("https://exposeyourself.firebaseio.com/games/" + game.$id + "/currentView").once('value', function(data) {
      curView = data.val();
    });

    // Return the state of our game to the controller.
    return curView;    
  }

  var updateCurrentView = function(view) {
    // Query game to find out if the game is in an active state.
    // This query method can be found here: https://www.firebase.com/blog/2013-10-01-queries-part-one.html#byid
    var ref = new Firebase("https://exposeyourself.firebaseio.com/games/" + game.$id);
    ref.update({currentView: view});
  }

  var getGame = function() {
    return game;
  };

  var getPlayerKey = function() {
    return playerKey;
  };

  // This function does 2 things:
  // 1. Sets our join condition so no more players can join the game.
  // 2. Sets the active state of the game so that we can now push players into the questions.
  var getPlayer = function() {
    return player;
  };

  var setJoin = function(canJoin, id){
    var newRef = new Firebase("https://exposeyourself.firebaseio.com/games/" + id);
    newRef.update({join: canJoin});
    newRef.update({active: true});
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

  var getGameTime = function() {
    return TIME_LEFT;
  };

  var getEndRound = function(){
    return END_ROUND;
  };

  var resetTimeLeft = function(){
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
    ref.child('timeLeft').set(TIME_LEFT);
  };

  var addQuestions = function(callback) {
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
    var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id + '/players');
    ref.once('value', function(players) {
      var tempPlayers = [];
      console.log(players.val());
      angular.forEach(players.val(), function(player) {
        tempPlayers.push(player.name);
      });
      var ref = new Firebase('https://exposeyourself.firebaseio.com/questionDB');
      ref.once('value', function(questions) {
        var tempQuestions = [];
        console.log(questions.val());
        angular.forEach(questions.val(), function(question) {
          tempQuestions.push(question.question);
        });
        // add ten random questions and add a random name to each one where 'JARVIS' is located
        var ref = new Firebase('https://exposeyourself.firebaseio.com/games/' + game.$id);
        var counter = 1;

        var tempQuestions = shuffleQuestions(tempQuestions).slice(0,10);

        // This checks if we've added all 10 questions to the game object
        // in the Firebase database first. If so, then we call our callback function
        // which will pass both host and player into the game with the correct questions.
        var checkCallback = function() {
          if (counter === 10) {
            callback();
          }
        }

        angular.forEach(tempQuestions, function(question) {
          if(counter <= 10) {
            var tempQues = {};
            tempQues[counter] = replaceName(question, randomName(tempPlayers));
            ref.child('questions').update(tempQues);
            counter++;
          }
          checkCallback(); // Trying to invoke a callback function here...    
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
    checkActive: checkActive,
    createGame: createGame,
    clearAnswers: clearAnswers,
    getCurrentView: getCurrentView,
    getGame: getGame,
    getGameTime: getGameTime,
    getEndRound: getEndRound,
    getPlayerKey: getPlayerKey,
    getPlayerAnswers: getPlayerAnswers,
    getPlayerNames: getPlayerNames,
    getTimeLeft: getTimeLeft,
    resetTimeLeft: resetTimeLeft,
    incrementPlayerScore: incrementPlayerScore,
    incrementRound: incrementRound,
    joinGame: joinGame,
    setJoin: setJoin,
    updateCurrentView: updateCurrentView
  };
});