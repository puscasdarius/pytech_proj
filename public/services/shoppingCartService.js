app.factory('shoppingCartService',function(){
  let cart = [];
  let display = false;
  let total = 0;

  let shoppingCart = {
    set_cart:function(cart){
      cart = cart;
    },
    get_cart:function(){
      return cart;
    },
    set_display(display){
      display = display;
    },
    get_display(){
      return display;
    },
    add_to_cart:function(product){
      display = true;
      let i = 0;
      while(cart[i] != null){
        //if there is already the product added
        //will be increased the qunatity
        if(cart[i].product.name == product.name){
          cart[i].quantity ++;
          return;
        }
        i++;
      }
      //if is not added yet, now is time
      cart[i] = {
        product:product,
        quantity:1
      }

    },
    remove_product:function(product){
      let i = 0;
      while(cart[i] != null){
          if(cart[i].product.name == product.name){
            cart[i].quantity--;
            break;
          }
          i++;
      }

      if(cart[i].quantity == 0){
        cart.splice(i,1);
      }

      if(cart.length == 0){
        display = false;
      }
    }

  }
  return shoppingCart;
});
