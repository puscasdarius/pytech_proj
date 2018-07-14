var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user_id:String,
  order_list:Array
})

var Order = mongoose.model('order',orderSchema);
module.exports = Order;
