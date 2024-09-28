function ErrorHandler(message, statusCode) {
    Error.call(this, message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
}

ErrorHandler.prototype = Object.create(Error.prototype);
ErrorHandler.prototype.constructor = ErrorHandler;

module.exports = ErrorHandler;