app.controller('homePageCtrl',function($scope,$http){
  console.log("in");
  $http.get('/test_route',function(response){
    console.log("received");
  });

  // $http.post('/test_route',{msg:'Message sent'},function(response){
  //   console.log(response.data);
  // })
});
