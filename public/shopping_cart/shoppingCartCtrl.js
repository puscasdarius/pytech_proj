app.controller('shoppingCartCtrl',function(shoppingCartService,$scope,$http,$location){
  $scope.title = "Shopping Cart";
  let user_id = localStorage.getItem('user_id');
  $scope.cart = shoppingCartService.get_cart();

    //get user data
  $http.post('/get_user_details',{user_id:user_id}).then(function(response){
    let user = response.data.user;
    $scope.user = user;
    $scope.email = user.email;
  })

  $scope.buy = function(){
    let user_data = {
      id:$scope.user._id,
    }
    let order_data = {
      cart:$scope.cart
    }
    let data = {
      user_data:user_data,
      order_data:order_data
    }
    $http.post('/add_order',data).then(function(response){
      if(response.data.msg == null){
        alert('Error while ordering');
      }else{
        alert(response.data.msg);
        $location.path('/view');
      }
    })
  }
})
