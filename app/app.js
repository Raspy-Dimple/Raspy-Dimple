angular.module("App", ["ui.router", "firebase"])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/home/home.html",
      controller: "homeCtrl"
    })
    .state("create", {
      url: "/create",
      templateUrl: "/create/create.html",
      controller: "createCtrl"
    })
    .state("join", {
      url: "/join",
      templateUrl: "/join/join.html",
      controller: "joinCtrl"
    })
    .state("question_display", {
      url: "/question_display",
      templateUrl: "/question_display/question_display.html",
      controller: "question_displayCtrl"
    })
    .state("question_player", {
      url: "/question_player",
      templateUrl: "/question_player/question_player.html",
      controller: "question_playerCtrl"
    })
    .state("result_display", {
      url: "/result_display",
      templateUrl: "/result_display/result_display.html",
      controller: "result_displayCtrl"
    })
    .state("result_player", {
      url: "/result_player",
      templateUrl: "/result_player/result_player.html",
      controller: "result_playerCtrl"
    })
    .state("voting_display", {
      url: "/voting_display",
      templateUrl: "/voting_display/voting_display.html",
      controller: "voting_displayCtrl"
    })
    .state("voting_player", {
      url: "/voting_player",
      templateUrl: "/voting_player/voting_player.html",
      controller: "voting_playerCtrl"
    })
    .state("final_result_display", {
      url: "/final_result_display",
      templateUrl: "/final_result_display/final_result_display.html",
      controller: "final_result_displayCtrl"
    })
    .state("final_result_player", {
      url: "/final_result_player",
      templateUrl: "/final_result_player.html",
      controller: "final_result_playerCtrl"
    });
  $urlRouterProvider.otherwise("/");
});