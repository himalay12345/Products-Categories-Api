const Product = require("../models/products");

module.exports = {
    findProductByName : async productName => {
	    return await Product.findOne({productName});
    },

    getSingleProduct : async _id => {
	    return await Product.findOne({_id}).populate('categoryId');
    },

    createProduct : async data => {
        return await Product.create(data)
    },

    setProductId : async _id => {
        return await Product.updateOne({_id} ,{
                '$set': {
                    'productId':_id
                }
                })
    },

    updateProductList : async (id,data) => {
        return await Product.findOneAndUpdate({
            _id:id
        },data,
         {
			new: true,
			upsert: false,
		}).populate('categoryId');
    },

    deleteProductList : async _id => {
        return await Product.deleteOne({
            _id})
    },

    getAllProducts : async () => {
        return await Product.find({}).populate('categoryId').sort({createdAt: -1})
    }
}