angular.module("App", ["ui.router", "firebase"])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/home/home.html",
      controller: "homeCtrl"
    });
  $urlRouterProvider.otherwise("/");
})