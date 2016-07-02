app.controller('reditCtrl', function ($scope, $http) {
  $scope.stories = [];

  $scope.load = function () {
    var params = {};
    if($scope.stories.length > 0){
      params['after'] = $scope.stories[$scope.stories.length - 1].data.name;
    }
    loadStories(params, function (olderStories) {
      $scope.stories = $scope.stories.concat(olderStories);
    });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    console.log('new load\n');
  };

  $scope.refresh = function (){
    var params = {'before': $scope.stories[0].data.name};
    loadStories(params, function(newStories){
      $scope.stories = newStories.concat($scope.stories);
    });
    $scope.$broadcast('scroll.refreshComplete');
  };

  function loadStories(params, callback){
    $http.get("https://www.reddit.com/r/all/new.json", {params:params})
      .success(function (response) {
        var stories = [];
        angular.forEach(response.data.children, function (child) {
          var story = child.data;
          if(!story.thumbnail || story.thumbnail === 'self' || story.thumbnail === 'nsfw' || story.thumbnail === 'default' )
            story.thumbnail = 'http://www.redditstatic.com/icon.png';
          stories.push(child);
        });
        callback(stories);
      });
  }
});
