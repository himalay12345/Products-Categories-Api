const Joi = require('joi')

module.exports.validateCategory = (data) => 
{
    const JoiSchema = Joi.object({
    
        categoryName: Joi.string()
                .required()
    })
    return JoiSchema.validate(data)
}


