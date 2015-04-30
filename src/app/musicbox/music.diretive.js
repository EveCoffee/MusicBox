/**
 * Created by coffee on 2015/4/30.
 */
angular.module('musicBox').directive('box',function(){
  return {
    restrict: 'E',
    template: '<audio src="http://nie.dfe.yymommy.com/249bac8ff9f98e55/1430839369/mp3_190_0/ff/b5/ff2104d4b23144a42eb256934e13bfb5.mp3?s=t" controls="controls"></audio>',
    replace: true,
    link: function(scope, element, attr){
      element.bind('mouseover',function(){
      });
    }
  }
});
