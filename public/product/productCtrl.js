app.controller('productCtrl',function($scope,$http,$routeParams,$location){
  $scope.title = "Product Details"
  $http.post('/get_product',{product_id:$routeParams.id}).then(function(response){
    let product = response.data.product;
    $scope.name = product.name;
    $scope.price = product.price;
  })

  $scope.send_product_changes = function(){
    let product_changes = {
      name:$scope.name,
      price:$scope.price
    }

    $http.put('/add_product',[{product_id:$routeParams.id},product_changes]).then(function(response){
      if(response.data.updated){
        $location.path('/admin');
      }
    })
  }
})
