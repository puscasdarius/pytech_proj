app.controller('viewCtrl',function(shoppingCartService,$scope,$http,$location){
  $scope.title = "View Page";
  $scope.order_option = "name";
  $scope.total = 0;
  $scope.display_issue = false;

  let products = [];
  let current_page = 0;

  $scope.display = shoppingCartService.get_display();
  $scope.cart = shoppingCartService.get_cart();
  init_list();


  //Initialize page
  function init_list(){
    get_products().then(function(response){
      products = response;
      $scope.products = response[current_page];
    })
  }

  //Used to retreive products and divide them
  // in fixed sized arrays(9 elems)
  function get_products(){
    let i = 0;
    let j = 0;
    return $http.get('/get_products').then(function(response){
      let products_len = response.data.products.length;
      max_page = products_len/9;
      while(i < (products_len/9)){
        let product_array = [];
        for(let k = 0;k<9;k++){
          //this verification is used ti avoid duplicates in ng-repeat
          //directive
          if(response.data.products[j] != null){
            product_array[k] = response.data.products[j];
            j++;
          }else{
            break;
          }
        }
        products[i] = product_array;
        i++;
      }
      return products;
    })
  }

  $scope.add_to_cart = function(product){
    shoppingCartService.add_to_cart(product);
    $scope.display = shoppingCartService.get_display();
    $scope.total += product.price;
    $scope.cart = shoppingCartService.get_cart();
  }

  $scope.remove_product = function(product){
    shoppingCartService.remove_product(product);
    $scope.total -= product.price;
    $scope.cart = shoppingCartService.get_cart();
    $scope.display = shoppingCartService.get_display();
  }

  $scope.view_product = function(id){
    $location.path('/view_product/'+id)
  }

  //Function used to order elements
  $scope.ordering = function(){
    if($scope.order_option == "price"){
      return '+price';
    }else{
      return 'name';
    }
  }

  $scope.prev_page = function(){
    if(current_page <= 0){
      $scope.products = products[0];
    }else{
      current_page--;
      $scope.products = products[current_page];
    }
  }

  $scope.next_page = function(){
    let max_page = products.length-1;
    if(current_page >= max_page){
      $scope.products = products[max_page];
    }else{
      current_page++;
      $scope.products = products[current_page];
    }
  }

  $scope.checkout = function(){
    //After redirecting to Ckeckout path
    // shopping cart keeps the values(it should be empty)
    //need fixing

    //User must be logged in for placing order
    console.log(localStorage.getItem('user_id'));
    if(localStorage.getItem('user_id') != '-1'){
      shoppingCartService.set_cart($scope.cart);
      $location.path('/checkout');
    }else{
      $scope.display_issue= true;
    }

  }
});
