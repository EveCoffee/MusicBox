/**
 * Created by coffee on 2015/5/5.
 */

(function($){
  var element;
  var timeList = [];
  var contentList = [];
  var parse = function(lrc){
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
          //格式化歌词
          content = '<li>' + content + '</li>';
          timeList.push(time);
          contentList.push(content);
        }
      }
    }
    return {
      'timeList': timeList,
      'contentList': contentList
    }
  };
  $.fn.parseLrcInit = function(lrc){
    element = this;
    timeList = [];
    contentList = [];
    parse(lrc);
    return {
      'timeList': timeList,
      'contentList': contentList
    };
  };
  $.fn.parseLrc = function(lrc,time_now){
    for(i in lrc.timeList){
      var lrc_time = lrc.timeList[i];
      if(lrc_time>time_now){
        break;
      }
    }
    return i;
  }
})($);
