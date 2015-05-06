/**
 * Created by coffee on 2015/4/30.
 */
angular.module('musicBox')
  .factory('audio',function($document){
    return $document[0].getElementsByTagName("audio")[0];
  }).factory('Lrc',function($document){
    var parseLrcInit = function(lrc){
      var timeList = [];
      var textList = [];
      for(var i = 0; i < lrc.split('\n').length; i++){
        var temp = lrc.split('\n')[i].match(/\[\d{2}:\d{2}.\d{2,3}]/g);
        if(temp){
          var m,s;
          t = temp[0].replace('[','').replace(']',"").split(':');
          m=t[0];
          s=t[1];
          if(s.split('.')[1].length!=3){
            var time = parseInt(m)*60 + parseFloat(s);
            var content = lrc.split('\n')[i].replace(temp,'');
            timeList.push(time);
            textList.push(content);
          }
        }
      }
      return {
        'timeList': timeList,
        'contentList': textList
      };
    };
    var parseLrc = function(lrc,time_now){
      for(i in lrc.timeList){
        var lrc_time = lrc.timeList[i];
        if(lrc_time>time_now){
          break;
        }
      }
      return i;
    };
    return {
      'parseLrcInit': parseLrcInit,
      'parseLrc': parseLrc
    };
  });
