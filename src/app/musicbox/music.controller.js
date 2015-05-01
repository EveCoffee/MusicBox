/**
 * Created by lingwanwangluo on 15/4/30.
 */
var music = angular.module('musicBox');

/*搜索*/
music.controller('MusicCtrl', function($scope,$rootScope,$http,audio){
  $scope.song_list = null;
  $scope.audio = audio;
  var url = 'http://so.ard.iyyin.com/s/song_with_out?q=明天你好&page=1&size=10&callback=JSON_CALLBACK';
  $http.jsonp(url)
    .success(function(response){
      $scope.song_list=response;
    });

  $scope.search = function(){
    /** @namespace
     * $scope.search_word: 搜索关键词
     * */
    $http.jsonp('http://so.ard.iyyin.com/s/song_with_out?q='+$scope.search_word+'&page=1&size=10&callback=JSON_CALLBACK')
      .success(function(response){
        $scope.song_list=response;
      });
  };

  $scope.play = function(index){
    var song = $rootScope.song = $scope.song_list.data[index];
    //默认选择第一个音质最差的，如果最好的就选择song.audition_list.length-1
    $scope.audio.src = song.audition_list[0].url;
    $scope.audio.play();
  };
  //$scope.audio.play();
});

/*播放控制*/
music.controller('PlayCtrl',function($scope, $rootScope, $http, audio){
  /**
   * @type {boolean} :  是否播放
   * currentTime  当前播放时间
   * $scope.currentTime_min:$scope.currentTime_min  当前播放分钟和秒数
   */
  $scope.isPlay = false;
  $scope.isPlay = audio.paused;
  $scope.currentTime = 0;
  $scope.currentTime_min = 0;
  $scope.currentTime_sec = 0;
  $scope.duration_min = 0;
  $scope.duration_sec = 0;
  $scope.play = function(){
    if(audio.paused){
      audio.play();
    }
    else{
      audio.pause();
    }
    $scope.isPlay = audio.paused;
  };
  /* 歌曲开始播放 */
  audio.onplay = function(){

  };
  /* 歌曲暂停播放 */
  audio.onpause = function(){
    $scope.isPlay = audio.paused;
    $scope.$apply();
    /* 不加$apply是不会刷新按钮的，fuck */
  };

  /* 歌曲正在播放 */
  $(audio).bind('timeupdate',function(){
    //更新当前播放时间
    var time = parseInt(audio.currentTime);
    $scope.currentTime = time;
    $scope.currentTime_min = parseInt(time/60);
    $scope.currentTime_sec = time%60;
    //更新总时间
    var duration = audio.duration;
    $scope.duration = duration;
    $scope.duration_min = parseInt(duration/60);
    $scope.duration_sec = parseInt(duration%60);
    $scope.isPlay = audio.paused;
    console.log(($scope.currentTime/$scope.duration*100));
    $scope.$apply();
  });

  //audio.addEventListener('timeupdate',function(){
  //  //console.log(audio.currentTime);
  //  $scope.currentTime = audio.currentTime;
  //  console.log($scope.currentTime);
  //});
});
