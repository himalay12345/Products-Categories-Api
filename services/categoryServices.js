const Category = require("../models/category");

module.exports = {
    findCategoryByName : async categoryName => {
	    return await Category.findOne({categoryName});
    },

    getSingleCategory : async _id => {
	    return await Category.findOne({_id});
    },

    createCategory : async data => {
        return await Category.create(data)
    },

    setCategoryId : async _id => {
        return await Category.updateOne({_id} ,{
                '$set': {
                    'categoryId':_id
                }
                })
    },

    updateCategoryList : async (id,data) => {
        return await Category.findOneAndUpdate({
            _id:id
        },data,
         {
			new: true,
			upsert: false,
		})
    },

    deleteCategoryList : async _id => {
        return await Category.deleteOne({
            _id})
    },

    getAllCategories : async () => {
        return await Category.find({}).sort({createdAt: -1});
    }
}