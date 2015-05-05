'use strict';

angular.module('musicBox', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('music', {
        url: '/music',
        templateUrl: 'app/musicBox/musicBox.html',
        controller: "MusicCtrl"
      }).state('music-list', {
        url: '/music-list',
        templateUrl: 'app/musicBox/musicList.html',
        controller: 'ListCtrl'
      }).state('music-lrc', {
        url: '/music-lrc',
        template: '<lrc></lrc>',
        controller: 'LrcCtrl'
      });

    $urlRouterProvider.otherwise('music-lrc');
  })
;

