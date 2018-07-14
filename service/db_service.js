var User = require('../models/User.js');
var Product = require('../models/Product.js');
var Order = require('../models/Order.js');

var bcrypt = require('bcryptjs');
let salt = 10;

let db_service = {
  register_user:function(req,res){
    User.findOne({email:req.body.email},function(err,result){
      console.log("here");
      if(err)throw err;
      if(result != null){
        //User is not registered
      }else{
        //Register user
        bcrypt.hash(req.body.password,salt,function(err,hash){
          if(err) throw err;
          req.body.password = hash;
          let new_user = new User(req.body);
          new_user.save(function(err){
            if(err)throw err;
          //  res.()
          })
        })
      }
    })

  },
  verify_user:function(req,res){
    if(req.body.email == "admin@admin" && req.body.password == "admin"){
      res.send({user_id:'admin'});
    }else{
      User.findOne({email:req.body.email},function(err,user){
        if(user != null){
          if(err) throw err;
          bcrypt.compare(req.body.password,user.password,function(err,result){
            if(err)throw err;
            if(result){
              res.send({user_id:user.id});
            }else{
              res.send({user_id:-1});
            }
          })
        }else{
          res.send({user_id:-1});
        }
      })
    }
  },
  get_user_details:function(req,res){
    User.findOne({_id:req.body.user_id},function(err,user){
      if(err)throw err;
      if(user != null){
        res.send({user:user});
      }
    })
  },
  add_product:function(req,res){
    let new_product = new Product(req.body);
    new_product.save(function(err,product){
      if(err) throw err;
      res.send({product:product});
    })
  },
  update_product:function(req,res){
    console.log("in");
    console.log(req.body[1]);
    Product.findByIdAndUpdate(req.body[0].product_id,req.body[1],{new:true},function(err,product){
      if(err) throw err;
      res.send({updated:true});
    })
  },
  get_products:function(req,res){
    Product.find(function(err,products){
      if(err) throw err;
      res.send({products:products});
    })
  },
  delete_product:function(req,res){
    console.log(req.params);
    console.log(req.body.product_id);
    Product.deleteOne({_id:req.body.product_id},function(err){
      if(err) throw err;

    })
  },
  get_product:function(req,res){
    Product.findOne({_id:req.body.product_id},function(err,product){
      if(err)throw err;
      console.log(product);
      res.send({product:product})
    })
  },
  add_order:function(req,res){
     let user = req.body.user_data;
     let order = req.body.order_data;
     let new_order = new Order();

     new_order.user_id = user.id;
     new_order.order_list = order.cart;

     new_order.save(function(err,order){
       if(err)throw err;
       res.send({msg:"Order has been placed"});
     })
  },
  delete_product:function(req,res){
    Product.findByIdAndDelete(req.params.id,function(err,product){
      if(err) throw err;
      if(product == null){
        res.send({msg:'Product could not be deleted!'})
      }
    })
  },
  get_orders:function(req,res){
    Order.find(function(err,orders){
      if(err)throw err
      res.send({orders:orders});
    })
  }
}


module.exports = db_service
