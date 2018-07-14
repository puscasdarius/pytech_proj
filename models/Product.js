var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name:String,
  price:Number
})

var Product = mongoose.model('product',productSchema);
module.exports = Product;
