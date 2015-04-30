/**
 * Created by lingwanwangluo on 15/4/30.
 */
angular.module('musicBox').controller('MusicCtrl', function($scope,$http){
  $scope.song_list = null;
  var url = 'http://so.ard.iyyin.com/s/song_with_out?q=彩虹&page=1&size=50&callback=JSON_CALLBACK';
  $http.jsonp(url)
    .success(function(response){
      $scope.song_list=response;
      console.log($scope.song_list);
    });

  $scope.search = function(){
    /** @namespace $scope.search_word */
    console.log($scope.search_word);
    $http.jsonp('http://so.ard.iyyin.com/s/song_with_out?q='+$scope.search_word+'&page=1&size=50&callback=JSON_CALLBACK')
      .success(function(response){
        $scope.song_list=response;
      });
  }

});
