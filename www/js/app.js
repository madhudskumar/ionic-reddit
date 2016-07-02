var app = angular.module('reddit', ['ionic', 'angularMoment']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
