const categoryJoi = require('../validation/categoryValidation')
const {handleResponse, handleError} = require('../config/requestHandler')
const {findCategoryByName, createCategory, setCategoryId, getAllCategories, getSingleCategory, updateCategoryList, deleteCategoryList} = require('../services/categoryServices')
const {removeKeys} = require('../utils/removeKeys')


module.exports = {

    createCategory : async (req, res) => {
        try{
            const {categoryName} = req.body;

            // Category Validation Check
            const value = await categoryJoi.validateCategory(req.body);
             if(value.error)
            {
                return handleResponse({res,msg:value.error.details[0].message})
            }

            // Check if category already exists
            const category = await findCategoryByName(categoryName)
            if(!category)
            {
                const newCategory = await createCategory({categoryName})
                await setCategoryId(newCategory._id)
                const newFilteredCategory = await removeKeys(newCategory._doc, "__v");
                const categories = await getAllCategories()
                return handleResponse({
                    res,
                    msg:'Category Added successfully',
                    data:{
                        length:categories.length,
                        Category:newFilteredCategory
                    }
                })

            }

            else{
                 return handleResponse({ res, msg: "Category Registered already!! please create new" });
            }
        }
        catch(error)
        {
            return handleError({ res, error, data: error })
        }
    },

    getAllCategories : async (req, res) => {
        try{
            const categories = await getAllCategories()
            if(categories){
                return handleResponse({
                    res,
                    data:categories
                })
            }
            else{
                return handleResponse({
                    res,
                    msg:'No Categories Found'
                })
            }
        }
        catch(error)
        {
            return handleError({ res, error, data: error }) 
        }
    },

    getCategoryById : async (req, res) => {
        try{
            const {id} = req.params;

            // Check if id params is provided or not
            if(!id)
            {
                return handleResponse({res,msg:'Please Enter the category id in params'})
            }

            const category = await getSingleCategory(id)

            if(category){
                return handleResponse({
                    res,
                    data:category
                })
            }

            else{
                return handleResponse({
                    res,
                    msg:'Category Not Found'
                })
            }
        }
        catch(error)
        {
            return handleError({ res, error, data: {...error,etype:'category'} }) 
        }
    },

    updateCategory : async (req, res) => {
        try{
            const {id} = req.params;
            const {categoryName} = req.body;

            // Check if id params is provided or not
            if(!id)
            {
                return handleResponse({res,msg:'Please Enter the category id'})
            }

            // Validation check for category name
            const value = await categoryJoi.validateCategory(req.body);
             if(value.error)
            {
                return handleResponse({res,msg:value.error.details[0].message})
            }

            const category = await getSingleCategory(id)
            if(!category)
            {
                return handleResponse({
                    res,
                    msg:'Category Not Found'
                })
            }
            const updateCategory = await updateCategoryList(id,req.body)
            if(updateCategory)
            {
                return handleResponse({
                    res,
                    data:updateCategory
                })
            }
    
            else{
                return handleResponse({
                    res,
                    msg:'Error in updating product'
                })
            }
        }
        catch(error){
            return handleError({ res, error, data: error }) 
        }
    },

    deleteCategory : async (req, res) => {

        try{
            const {id} = req.params;

            //Check for query params 
            if(!id)
            {
                return handleResponse({res,msg:'Please Enter the category id'})
            }

            //Check if category exists or not
            const category = await getSingleCategory(id)
            if(!category){
                return handleResponse({
                    res,
                    msg:'Category Not Found'
                })
            }

            // Delete category
            const deleteCategory = await deleteCategoryList(id)    
                if(deleteCategory.deletedCount > 0)
                {
                    return handleResponse({
                        res,
                        msg:'Category Deleted successfully',
                    })
                }
            
                else{
                    return handleResponse({
                        res,
                        msg:'Error in deleting category'
                    })
                }
        }
        catch(error)
        {
            return handleError({ res, error, data: {...error,etype:'category'} }) 

        }
    }
}