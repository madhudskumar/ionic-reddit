app.controller('reditCtrl', function ($scope, $http) {
  $scope.stories = [];
  $http.get('http://www.reddit.com/r/all/new/.json')
    .success(function (response) {
      $scope.stories = response.data.children;
    })
});
