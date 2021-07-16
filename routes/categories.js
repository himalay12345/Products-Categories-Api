const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

// Categories CRUD Operations
router.post('/create',categoriesController.createCategory)
router.get('/readAll',categoriesController.getAllCategories)
router.get('/:id',categoriesController.getCategoryById)
router.put('/update/:id',categoriesController.updateCategory)
router.delete('/delete/:id',categoriesController.deleteCategory)

module.exports = router