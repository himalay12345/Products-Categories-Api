module.exports = {
    handleResponse: ({ res, statusCode = 200, msg = "Success", data = {}, result = 1 }) => {
		res.status(statusCode).send({ result, msg, data });
	},

    handleError: ({
		res,
		statusCode = 500,
		err_msg = "Server Error",
		err = "error",
		data = {},
		result = 0,
	}) => {

        if(data.kind === 'ObjectId' && data.path === '_id' && data.etype === 'category' )
        {
            res.status(statusCode).send({
                result,
                err_msg:'Enter the correct category id',
                msg: 'Invalid Category Id',
                data,
            }); 
        }

		if(data.kind === 'ObjectId' && data.path === '_id' && data.etype === 'product')
        {
            res.status(statusCode).send({
                result,
                err_msg:'Enter the correct product id',
                msg: 'Invalid Product Id',
                data,
            }); 
        }

		res.status(statusCode).send({
			result,
			err_msg,
			msg: err instanceof Error ? err.message : err.msg || err,
			data,
		});
	},
}