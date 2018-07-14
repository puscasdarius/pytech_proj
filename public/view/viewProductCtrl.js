app.controller('viewProductCtrl',function(shoppingCartService,$scope,$http,$routeParams,$location){
  $scope.title = "Product Details";

  $http.post('/get_product',{product_id:$routeParams.id}).then(function(response){
    $scope.product = response.data.product;
  })

  $scope.add_to_cart = function(product){
    shoppingCartService.add_to_cart(product);
    $location.path('/view');
  }
});
