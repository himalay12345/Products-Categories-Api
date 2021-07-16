const Category = require('../models/category')
const mongoose = require('mongoose');

module.exports.getAllCategories = async (req, res) => {
    let categories = await Category.find({}).sort({createdAt: -1});

    if(categories){
        return res.status(200).json({
            status:'success',
            length:categories.length,
            categories
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Categories Not Found'
        })
    }
}

module.exports.getCategoryById = async (req, res) => {
    let categories = await Category.find({categoryId:req.params.id})

    if(categories){
        return res.status(200).json({
            status:'success',
            categories:categories
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Categories Not Found'
        })
    }
}

module.exports.createCategory = async (req, res) => {

    let id = mongoose.Types.ObjectId();
   
    let category = await Category.create({
        categoryName:req.body.categoryName,
        categoryId:id
    })

    await Category.updateOne({
        _id:category._id
    },{
    '$set': {
        'categoryId':category._id
    }
    })

    let categories = await Category.find({});


    if(category)
    {
        return res.status(200).json({
            status:'success',
            length:categories.length,
            msg:'Category added successfully'
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Error in adding categories'
        })
    }
}

module.exports.updateCategory = async (req, res) => {

    let category = await Category.updateOne({
        categoryId:req.params.id
    },{
    '$set': {
        'categoryName':req.body.categoryName
    }
})

    let updated_category = await Category.find({categoryId:req.params.id})

    if(category.nModified > 0)
    {
        return res.status(200).json({
            status:'success',
            msg:'Category Updated successfully',
            category:updated_category
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Error in updating category'
        })
    }
}

module.exports.deleteCategory = async (req, res) => {

    let category = await Category.deleteOne({
        categoryId:req.params.id})

    

    let categories = await Category.find({});


        if(category.deletedCount > 0)
        {
            return res.status(200).json({
                status:'success',
                length:categories.length,
                msg:'Category Deleted successfully',
            })
        }
    
        else{
            return res.status(404).json({
                status:'fail',
                msg:'No Category found with this id'
            })
        }
    }