const router = require('express').Router()
const {home}= require('../controllers/index')

router.use('/products',require('./products'))
router.use('/categories',require('./categories'))

router.get('/',home)


module.exports = router