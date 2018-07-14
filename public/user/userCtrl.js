app.controller('userCtrl',function($scope,$http,$routeParams){
  $http.post('/get_user_details',{user_id:$routeParams.id}).then(function(response){
    $scope.user = response.data.user;
  })
})
