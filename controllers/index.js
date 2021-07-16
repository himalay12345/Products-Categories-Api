const Category = require('../models/category')
const mongoose = require('mongoose');

module.exports.home = (req, res) => {
    return res.json({
        createdBy:'Himalay Shankar'
    })
}

