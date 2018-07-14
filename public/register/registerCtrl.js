app.controller('registerCtrl',function($scope,$http){
  $scope.title = "Register";
  $scope.register = function(){
    let user_data = {
      email:$scope.email,
      password:$scope.password
    }

    $http.post('/register_user',user_data,function(response){
      console.log(response);
    })
  }
})
