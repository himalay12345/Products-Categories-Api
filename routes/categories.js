const router = require('express').Router()
const {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory} = require('../controllers/categoriesController')

// Categories CRUD Operations
router.post('/create',createCategory)
router.get('/readAll',getAllCategories)
router.get('/:id',getCategoryById)
router.put('/update/:id',updateCategory)
router.delete('/delete/:id',deleteCategory)

module.exports = router