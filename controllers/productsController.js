const Product = require('../models/products')
const Category = require('../models/category')


module.exports.getAllProducts = async (req, res) => {
    let products = await Product.find({}).populate('categoryId').sort({createdAt: -1})

    if(products){
        return res.status(200).json({
            status:'success',
            length:products.length,
            products:products
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Products Not Found'
        })
    }
}

module.exports.getProductById = async (req, res) => {
    try{
    let products = await Product.findOne({productId:req.params.id}).populate('categoryId')

    if(products){
        return res.status(200).json({
            status:'success',
            products:products
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Product Not Found'
        })
    }
}
catch(err)
{
    return res.status(404).json({
        status:'fail',
        msg:'Invalid Product Id'
    })
}
}

module.exports.createProduct = async (req, res) => {

    try{

    // Check if category id exists
    if(req.body.categoryId)
    {
        let category = await Category.findOne({categoryId:req.body.categoryId})
        if(!category)
        {
            return res.status(404).json({
                status:'fail',
                msg:'Invalid categoryId'
            })
        }
    }

    let product = await Product.create({
        productName:req.body.productName,
        qtyPerUnit:req.body.qtyPerUnit,
        unitPrice:req.body.unitPrice,
        unitInStock:req.body.unitInStock,
        discontinued:req.body.discontinued,
        categoryId:req.body.categoryId,
    })


    await Product.updateOne({
        _id:product._id
    },{
    '$set': {
        'productId':product._id
    }
})

    let products = await Product.find({});


    if(product)
    {
        return res.status(200).json({
            status:'success',
            length:products.length,
            msg:'Product added successfully'
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Error in adding products'
        })
    }
}
    catch(err)
    {
        return res.status(404).json({
            status:'fail',
            msg:err.message
        })  
    }
}

module.exports.updateProduct = async (req, res) => {

    try{
    console.log(req.body.categoryId)
    // Check if category id exists
    if(req.body.categoryId)
    {
        let category = await Category.findOne({categoryId:req.body.categoryId})
        console.log(category)
        if(!category)
        {
            return res.status(404).json({
                status:'fail',
                msg:'Invalid categoryId'
            })
        }
    }

    let product = await Product.findOne({productId:req.params.id})
    let nproduct = await Product.updateOne({
        productId:req.params.id
    },{
    '$set': {
        'productName':req.body.productName ? req.body.productName : product.productName,
        'qtyPerUnit':req.body.qtyPerUnit ? req.body.qtyPerUnit : product.qtyPerUnit,
        'unitPrice':req.body.unitPrice ? req.body.unitPrice : product.unitPrice,
        'unitInStock':req.body.unitInStock ? req.body.unitInStock : product.unitInStock,
        'discontinued':req.body.discontinued ? req.body.discontinued : product.discontinued,
        'categoryId':req.body.categoryId ? req.body.categoryId : product.categoryId,

    }
})

    let updated_product = await Product.find({productId:req.params.id})

    if(nproduct.nModified > 0)
    {
        return res.status(200).json({
            status:'success',
            msg:'Product Updated successfully',
            product:updated_product
        })
    }

    else{
        return res.status(404).json({
            status:'fail',
            msg:'Error in updating product'
        })
    }
}
catch(err)
    {
        return res.status(404).json({
            status:'fail',
            msg:err.message
        })  
    }
}

module.exports.deleteProduct = async (req, res) => {

    try{

    let product = await Product.deleteOne({
        productId:req.params.id})

    

    let products = await Product.find({});


        if(product.deletedCount > 0)
        {
            return res.status(200).json({
                status:'success',
                length:products.length,
                msg:'Product Deleted successfully',
            })
        }
    
        else{
            return res.status(404).json({
                status:'fail',
                msg:'No Product found with this id'
            })
        }
    }
    catch(err)
    {
        return res.status(404).json({
            status:'fail',
            msg:err.message
        })  
    }
    }