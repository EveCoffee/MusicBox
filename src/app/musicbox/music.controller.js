/**
 * Created by lingwanwangluo on 15/4/30.
 *
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
    /*通过全局的song来传递歌曲名和歌手名*/
    var song = $rootScope.song = $scope.song_list.data[index];
    $rootScope.song_list.push(song);
    //默认选择第一个音质最差的，如果最好的就选择song.audition_list.length-1
    /*$scope.audio.src = song.audition_list[song.audition_list.length-1].url;
      $scope.audio.play();
    */
    $rootScope.play_latest();
  };
  //$scope.audio.play();
});

/*播放控制*/
music.controller('PlayCtrl', function($scope, $rootScope, $http, audio, Lrc){
  /**
   * volume_value :   音量
   * volume_show :  是否显示音量滑块
   * volume_status : 是否静音
   * isPlay {boolean} :  是否播放
   * currentTime  当前播放时间
   * currentTime_min : currentTime_sec  当前播放分钟和秒数
   * range_value  :   滑块的百分比
   * song_list  :   全局歌曲列表
   * song_now :  当前播放的位置，用于确定播放按钮的显示
   * lrc_index:  歌词的高亮行
   */
  $scope.range_value = 0;
  $scope.volume_value = 10;
  $scope.volume_status = true;
  $scope.volume_show = false;
  $rootScope.isPlay = $scope.isPlay = audio.paused;
  $scope.currentTime = 0;
  $scope.currentTime_min = 0;
  $scope.currentTime_sec = 0;
  $scope.duration_min = 0;
  $scope.duration_sec = 0;
  $rootScope.song_list = [
    {
      song_name: "说了再见",
      singer_name: "周杰伦",
      song_id: "545150",
      url_list: [
        {
          "duration": "02:35",
          "format": "m4a",
          "bitrate": 32,
          "type_description": "压缩品质",
          "url": "http://a.ali.dongting.com/a14ee5fbe17a789c/1431353941/m4a_32_8/87/80/87f6958a6a59fe63ff73b70652441f80.m4a?s=t",
          "size": "0.61M",
          "type": 1
        },
        {
          "duration": "02:35",
          "format": "mp3",
          "bitrate": 128,
          "type_description": "标准品质",
          "url": "http://a.ali.dongting.com/a14ee5fbe17a789c/1431353941/mp3_128_8/87/80/87f6958a6a59fe63ff73b70652441f80.mp3?s=t",
          "size": "2.37M",
          "type": 2
        }
      ]
    },
    {
      song_name: "OH",
      singer_name: "少女时代",
      song_id: "522929",
      "url_list": [
        {
          "duration": "03:08",
          "format": "m4a",
          "bitrate": 32,
          "type_description": "压缩品质",
          "url": "http://a.ali.dongting.com/68d22828502bedb5/1431353881/m4a_32_5/c1/c6/c102bbfcdcf918b2de792fcf39ab52c6.m4a?s=t",
          "size": "0.74M",
          "type": 1
        },
        {
          "duration": "03:08",
          "format": "mp3",
          "bitrate": 128,
          "type_description": "标准品质",
          "url": "http://a.ali.dongting.com/68d22828502bedb5/1431353881/mp3_128_5/c1/c6/c102bbfcdcf918b2de792fcf39ab52c6.mp3?s=t",
          "size": "2.88M",
          "type": 2
        }
      ]
    },
    {
      song_name: "超跑女神",
      singer_name: "周杰伦",
      song_id: "873444",
      url_list: [
        {
          "duration": "02:35",
          "format": "m4a",
          "bitrate": 32,
          "type_description": "压缩品质",
          "url": "http://a.ali.dongting.com/a14ee5fbe17a789c/1431353941/m4a_32_8/87/80/87f6958a6a59fe63ff73b70652441f80.m4a?s=t",
          "size": "0.61M",
          "type": 1
        },
        {
          "duration": "02:35",
          "format": "mp3",
          "bitrate": 128,
          "type_description": "标准品质",
          "url": "http://a.ali.dongting.com/a14ee5fbe17a789c/1431353941/mp3_128_8/87/80/87f6958a6a59fe63ff73b70652441f80.mp3?s=t",
          "size": "2.37M",
          "type": 2
        }
      ]
    }
  ];
  $rootScope.song_now = 0;
  $rootScope.song = $rootScope.song_list[$rootScope.song_now];
  $rootScope.lrcIndex= 1;
  audio.src = $rootScope.song.url_list[0].url;

  /*播放歌曲 如果没有参数就是点击的播放按钮，否则就是上一曲下一曲切换播放*/
  $scope.play = function(song_now){
    if(!song_now){
      if(audio.paused){
        audio.play();
      }else{
        audio.pause();
      }
      $scope.isPlay = audio.paused;
    }else{
      if($rootScope.song_now == $rootScope.song_list.length){
        $rootScope.song_now = 0;
      }else if($rootScope.song_now<0){
        $rootScope.song_now = $rootScope.song_list.length-1;
      }
      $rootScope.song = $rootScope.song_list[$rootScope.song_now];
      audio.src = $rootScope.song.url_list[0].url;
      $rootScope.parseSongById($rootScope.song_list[$rootScope.song_now].song_id, 'lrc');
      audio.play();
    }

  };
  /*下一曲*/
  $scope.next = function(){
    $rootScope.song_now++;
    $scope.play($rootScope.song_now);
  };
  /*上一曲*/
  $scope.prev = function(){
    $rootScope.song_now--;
    $scope.play($rootScope.song_now);
  };

  $rootScope.play_latest = function(){
    $rootScope.song_now = $rootScope.song_list.length- 1;
    $scope.play($rootScope.song_now);
  };
  /* 歌曲开始播放 */
  audio.onplay = function(){
    $rootScope.isPlay = $scope.isPlay = audio.paused;
  };
  /* 歌曲暂停播放 */
  audio.onpause = function(){
    $rootScope.isPlay = $scope.isPlay = audio.paused;
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

    if($rootScope.LrcList){
      $rootScope.lrcIndex = Lrc.parseLrc($rootScope.LrcList, audio.currentTime) - 1;
    }
  });

  /*歌曲播放完毕*/
  audio.addEventListener('ended', function(){
    $scope.next();
  },false);
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
  };

  /*crc32效验*/
  $scope.crc32 = function(e) {
    var t, r, n, a = new Array(256);
    for (t = 0; 256 > t; t++) {
      for (n = t, r = 0; 8 > r; r++) n = 1 & n ? n >> 1 & 2147483647 ^ 3988292384 : n >> 1 & 2147483647;
      a[t] = n
    }
    for ("string" != typeof e && (e = "" + e), n = 4294967295, t = 0; t < e.length; t++) n = n >> 8 & 16777215 ^ a[255 & n ^ e.charCodeAt(t)];
    return n ^= 4294967295,(n >> 3).toString(16)
  };

  /*通过歌曲id， 解析歌曲、歌词、歌手图片*/
  $rootScope.parseSongById = function(song_id, objectType){
    var code, song_url, lrc_url, pic_url, singer_name, song_name;
    code = $scope.crc32(song_id);
    song_url = "http://ting.hotchanson.com/website/ting?song_id="+song_id+"&code="+code+"&from=search&callback=JSON_CALLBACK";
    song_name = "";
    singer_name = "";
    $http.jsonp(song_url).success(function(response){
      song_name = response.data[0].song_name;
      singer_name = response.data[0].singer_name;
      lrc_url = "http://lp.music.ttpod.com/lrc/down?artist="+singer_name+"&lrcid=&title="+song_name+"&song_id="+song_id+"&code="+$scope.crc32(song_id)+"&callback=JSON_CALLBACK";
      pic_url = "http://lp.music.ttpod.com/pic/down?artist="+singer_name+"&rand=&code="+$scope.crc32($rootScope.singer_name)+"&callback=JSON_CALLBACK";
      if (!objectType) {
        $rootScope.song_list.push(response.data[0]);
        $rootScope.play_latest();
        return response;
      } else {
        switch (objectType) {
          case 'lrc':
            $http.jsonp(lrc_url).success(function (response) {
              $rootScope.LrcList = Lrc.parseLrcInit(response.data.lrc);
              console.log(response);
              return response;
            });
            break;
          case 'pic':
            $http.jsonp(pic_url).success(function (response) {
              //console.log(response);
              return response;
            });
            break;
        }
      }
    });
  };

  var song_id = 522929;
  $rootScope.parseSongById(song_id);
  $rootScope.parseSongById(song_id, 'lrc');

  $(audio).on('timeupdate', function(){
    //console.log($rootScope.LrcList);
    //$scope.currentTime = audio.currentTime;


  });
});

/*播放列表*/
music.controller('ListCtrl', function($scope, $rootScope, $http, audio){

  $scope.play = function(index){
    var song = $rootScope.song = $rootScope.song_list[index];
    audio.src = song.url_list[0].url;
    audio.play();
    $rootScope.song_now = index;
  }
});

/*歌词列表*/
music.controller('LrcCtrl', function($scope, $rootScope, $http, audio, Lrc){



});
