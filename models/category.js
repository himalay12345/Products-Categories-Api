const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
   categoryId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'
   },
   categoryName:{
       type:String
   },
   createdAt: { type: Date, default: Date.now }


});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;