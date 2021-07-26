const router = require('express').Router()
const {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct} = require('../controllers/productsController')

// Products CRUD Operations
router.post('/create',createProduct)
router.get('/readAll',getAllProducts)
router.get('/read/:id',getProductById)
router.put('/update/:id',updateProduct)
router.delete('/delete/:id',deleteProduct)


module.exports = router