const router = require('express').Router()
const productsController = require('../controllers/productsController')

// Products CRUD Operations
router.post('/create',productsController.createProduct)
router.get('/readAll',productsController.getAllProducts)
router.get('/read/:id',productsController.getProductById)
router.put('/update/:id',productsController.updateProduct)
router.delete('/delete/:id',productsController.deleteProduct)


module.exports = router