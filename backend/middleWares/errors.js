const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err};
        error.message = err.message;

        //  Wrong mongoose object id error
        if(err.name === 'CastError'){
            const message = `Resource no found! Invalid: ${err.path}`
            error = new ErrorHandler(message,400)
        }

        //Handling mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(item=>item.message);            
            error = new ErrorHandler(message, 400)
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error!'
        })
    }
    
}