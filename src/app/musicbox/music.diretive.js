/**
 * Created by coffee on 2015/4/30.
 */
angular.module('musicBox')
  .directive('box',function(){
  return {
    restrict: 'E',
    template: '<audio src="http://nie.dfe.yymommy.com/249bac8ff9f98e55/1430839369/mp3_190_0/ff/b5/ff2104d4b23144a42eb256934e13bfb5.mp3?s=t"></audio>',
    replace: true,
    link: function(scope, element, attr){

    }
  }
  })
  .directive('lrc',function(){
    return {
      restrict: 'E',
      templateUrl: 'app/musicBox/musicLrc.html',
      replace: true,
      link: function(scope, element, attr){

      },
      controller:function($scope, $rootScope){
       /*
        var time_now = 50.58;

        $rootScope.playLrc = function(time){
          var LrcElement = $('.lrc-list').find('li');
          var list = LrcElement.parseLrcInit(lrc);
          var index=LrcElement.parseLrc(list,time)-1;
          console.log(index);
          LrcElement.removeClass('active').eq(index).addClass('active');
        }
        */
      }
    }
  })
;
