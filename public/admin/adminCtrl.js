app.controller('adminCtrl',function($scope,$http,$location){
  $scope.title = "Admin";
  $scope.display_err = false;
  $scope.display = true;

  get_products();
  get_orders();

  $scope.add_product = function(){
    let product_data = {
      name:$scope.name,
      price:$scope.price
    }

    $http.post('/add_product',product_data).then(function(response){
      console.log(response.data);
      get_products();
    })
  }
  $scope.product_details = function(id){
    $location.path('admin/product/'+id);
  }

  $scope.delete_product = function(id){
    $http.delete('/get_product/'+id).then(function(response){
      $scope.msg = response.data.msg
      if($scope.msg != null){
        $scope.display_err = true;
      }else{
        //On the back side works perfectlly
        //but on the front size it does not update list
        get_products();
      }
    })
  }

  function get_products(){
    $http.get('/get_products').then(function(response){
      $scope.products = response.data.products;
      console.log($scope.products.length);
    })
  }

  function get_orders(){
    $http.get('/get_orders').then(function(response){
      $scope.orders = response.data.orders;
      console.log($scope.orders);
    })
  }

  $scope.change_panel = function(panel_no){
    if(panel_no == 1){
      $scope.display = false;
    }else{
      $scope.display = true;
    }
  }
})
