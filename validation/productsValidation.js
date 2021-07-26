const Joi = require('joi')

module.exports.validateProduct = (data) => 
{
    const JoiSchema = Joi.object({
    
        categoryId: Joi.string()
                .required(),
        productName: Joi.string()
                .required(),
        qtyPerUnit: Joi.number()
                .required(),
        unitPrice: Joi.number()
                .required() ,
        unitInStock: Joi.number()
                .required() ,
        discontinued: Joi.boolean()
                .required()  
    })
    return JoiSchema.validate(data)
}


