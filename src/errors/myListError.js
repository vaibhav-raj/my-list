// class MyListError extends Error {
//     constructor(serviceName, message, statusCode,) {
//         super(message);
//         this.statusCode = statusCode;
//         this.serviceName = serviceName;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// module.exports = MyListError



class MyListError extends Error {
    constructor(serviceName, message, statusCode,) {
        super(message);
        this.statusCode = statusCode;
        this.name = "MyListError";
    }
}

module.exports = MyListError


