const mongoose = require('mongoose');
const Category = require('./category')

const productSchema = mongoose.Schema({
   productId:{
        type:mongoose.Schema.Types.ObjectId
   },
   productName:{
       type:String
   },
   qtyPerUnit:{
       type:Number
   },
   unitPrice:{
       type:Number
   },
   unitInStock:{
       type:Number
   },
   discontinued:{
        type:Boolean
    },
   categoryId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Category'
   },
   createdAt: { type: Date, default: Date.now }


});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;