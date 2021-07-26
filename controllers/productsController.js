const productsJoi = require('../validation/productsValidation')
const {handleResponse, handleError} = require('../config/requestHandler')
const {findProductByName, createProduct, setProductId, getAllProducts, getSingleProduct, updateProductList, deleteProductList} = require('../services/productServices')
const {getSingleCategory} = require('../services/categoryServices')


module.exports = {

    createProduct : async (req, res) => {
        try{
            const {productName,categoryId} = req.body;

            //Validation check for products 
            const value = await productsJoi.validateProduct(req.body);
            if(value.error)
            {
                return handleResponse({res,msg:value.error.details[0].message})
            }
            
            //Check if product name already exists
            const product = await findProductByName(productName)
            if(product)
            {
                return handleResponse({
                    res,
                    msg:'Product already with this name exists !'
                })
            }
            else{
                // Check if category with this category id exists
                const category = await getSingleCategory(categoryId)
                if(!category)
                {
                    return handleResponse({
                        res,
                        msg:'No Category exists with this id!'
                    })
                }

                else{
                // Create new product
                const newProduct = await createProduct(req.body)
                await setProductId(newProduct._id)
                if(newProduct)
                {
                    return handleResponse({
                        res,
                        msg:'Product added successfully',
                        data:newProduct
                    })
                }
            
                else{
                    return handleResponse({
                        res,
                        msg:'Error in adding products'
                    })
                }
                }
        }
    }
        catch(error)
        {
            return handleError({ res, error, data: error }) 
        }
    },

    getAllProducts : async (req, res) => {
        try{
            const products = await getAllProducts()
            if(products){
                return handleResponse({
                    res,
                    data:products
                })
            }

            else{
                return handleResponse({
                    res,
                    msg:'No Products Found !'
                })
            }
        }
        catch(error)
        {
            return handleError({ res, error, data: error }) 

        }
    },

    getProductById : async (req, res) => {
    try{
        const {id} = req.params;
        // Check if id params exists
        if(!id)
        {
            return handleResponse({res,msg:'Please Enter the product id'})
        }

        const product = await getSingleProduct(id)
        if(product){
            return handleResponse({
                res,
                data:product
            })
        }

        else{
            return handleResponse({
                res,
                msg:'Product Not Found'
            })
        }
        }
        catch(error)
        {
            return handleError({ res, error, data: {...error,etype:'product'} }) 
        }   
    },

    updateProduct : async (req, res) => {

    try{
        const {categoryId} = req.body;
        const {id} = req.params;

        // Check if category id exists
        if(categoryId)
        {
            const category = await getSingleCategory(categoryId)
            if(!category)
            {
                return handleResponse({
                    res,
                    msg:'No Category exists with this id!'
                })
            } 
        }

        const product = await updateProductList(id,req.body)
        if(product)
        {
            return handleResponse({
                res,
                msg:'Product Updated successfully',
                data:product
            })
        }
        else{
            return handleResponse({
                res,
                msg:'Error in updating product'
            })
        }
        }
        catch(error)
            {
                return handleError({ res, error, data:error }) 
            }
    },

    deleteProduct : async (req, res) => {

    try{
        const {id} = req.params;

        // Check if id params exists or not
        if(!id)
        {
            return handleResponse({res,msg:'Please Enter the product id'})
        }

        // Check if products exists or not
        const product = await getSingleProduct(id)
        if(!product){
            return handleResponse({
                res,
                msg:'Invalid product id'
            })
        }

        //Delete product
        const deletedProduct = await deleteProductList(id)
        if(deletedProduct)
        {
            return handleResponse({
                res,
                msg:'Product deleted successfully'
            })
        }

        else{
            return handleResponse({
                res,
                msg:'Error in deleting product'
            })
        }
        

    

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
        return handleError({ res, error, data: {...error,etype:'product'} })  
    }
    }
}