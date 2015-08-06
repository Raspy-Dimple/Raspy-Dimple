angular.module("App")
.factory("fireBaseFactory", function($firebaseObject) {
  var ref = new Firebase("https://exposeyourself.firebaseio.com/");
  return $firebaseObject(ref);
})