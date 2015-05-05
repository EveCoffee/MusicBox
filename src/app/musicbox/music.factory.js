/**
 * Created by coffee on 2015/4/30.
 */
angular.module('musicBox')
  .factory('audio',function($document){
    return $document[0].getElementsByTagName("audio")[0];
  }).factory('lrc',function($document){
    return $('.lrc-list');
  });
