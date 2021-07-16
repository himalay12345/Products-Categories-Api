const router = require('express').Router()
const indexController = require('../controllers/index')

router.use('/products',require('./products'))
router.use('/categories',require('./categories'))

router.get('/',indexController.home)


module.exports = router