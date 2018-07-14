app.controller('logInCtrl',function($scope,$http,$location){
  $scope.title = "Log In"
  $scope.log_in = function(){
    let user_data = {
      email:$scope.email,
      password:$scope.password
    }
     $http.post('/verify_user',user_data).then(function(response){
       let user_id = response.data.user_id;
       localStorage.setItem('user_id',user_id);
       if(user_id == "admin"){
         return $location.path('/admin');
       }
       if( user_id != -1){
         return $location.path('/user/'+user_id);
       }
     });
  }
})
