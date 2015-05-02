/**
 * Created by lingwanwangluo on 15/4/30.
 */
var music = angular.module('musicBox');

/*搜索*/
music.controller('MusicCtrl', function($scope, $rootScope, $http, audio){
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
   * volume_value :   音量
   * volume_show :  是否显示音量滑块
   * volume_status : 是否静音
   * isPlay {boolean} :  是否播放
   * currentTime  当前播放时间
   * currentTime_min : currentTime_sec  当前播放分钟和秒数
   * range_value  :   滑块的百分比
   */
  $scope.volume_value = 1.0;
  $scope.volume_status = true;
  $scope.volume_show = false;
  $scope.isPlay = audio.paused;
  $scope.currentTime = 0;
  $scope.currentTime_min = 0;
  $scope.currentTime_sec = 0;
  $scope.duration_min = 0;
  $scope.duration_sec = 0;

  /*播放切换*/
  $scope.play = function(){
    if(audio.paused){
      audio.play();
    }else{
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
    if(parseInt($scope.currentTime)%2==0){
      $scope.range_value = ($scope.currentTime/$scope.duration*100);
    }
    $scope.$apply();
  });

  /*进度条改变事件*/
  $scope.range_change = function(){
    //console.log(parseInt($scope.duration*$scope.range_value/100));
    audio.currentTime = parseInt($scope.duration*$scope.range_value/100);
  };

  /*音量滑块改变时间*/
  $scope.volume_change = function(){
    $scope.volume_status = Boolean(parseInt($scope.volume_value));
    audio.volume = $scope.volume_value/10;
  };

  /*音量切换*/
  $scope.volume_click = function(){
    $scope.volume_show = !$scope.volume_show;
  }
});

/*播放列表*/

music.controller('ListCtrl',function($scope, $rootScope, $http, audio){
  $scope.song_list = [
    {
      song_name: "明天你好",
      singer_name: "牛奶咖啡",
      code: "",
      url: [
        {
          bitrate: 32,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        },
        {
          bitrate: 128,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        },
        {
          bitrate: 320,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        }
      ]
    },
    {
      song_name: "说了再见",
      singer_name: "周杰伦",
      code: "",
      url: [
        {
          bitrate: 32,
          url: "http://a.ali.dongting.com/895a503cd74a6e61/1431014768/m4a_32_5/ff/ce/ff9c141c7ab496d091a7c01472dc15ce.m4a?s=t"
        },
        {
          bitrate: 128,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        },
        {
          bitrate: 320,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        }
      ]
    },
    {
      song_name: "OH",
      singer_name: "少女时代",
      code: "",
      url: [
        {
          bitrate: 32,
          url: "http://nmo.ouj.yymommy.com/132225da8135bb68/1431014799/m4a_32_5/c1/c6/c102bbfcdcf918b2de792fcf39ab52c6.m4a?s=t"
        },
        {
          bitrate: 128,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        },
        {
          bitrate: 320,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        }
      ]
    },
    {
      song_name: "超跑女神",
      singer_name: "周杰伦",
      code: "",
      url: [
        {
          bitrate: 32,
          url: "http://a.ali.dongting.com/d95338b2ec37f9f5/1431014830/m4a_32_8/87/80/87f6958a6a59fe63ff73b70652441f80.m4a?s=t"
        },
        {
          bitrate: 128,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        },
        {
          bitrate: 320,
          url: "http://nie.dfe.yymommy.com/120b12a903058cc3/1431014386/m4a_32_71/7b/25/7b1e92af091ea21b747b3309412f4925.m4a?s=t"
        }
      ]
    },

  ];
});
