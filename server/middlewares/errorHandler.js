function errorHandler(error, request, response, next) {
    response.status(error.status ? error.status : 500).json({
        success: false,
        error: {
            code: error.status ? error.status : 500,
            message: error.message
        }
    });
}

export default errorHandler;