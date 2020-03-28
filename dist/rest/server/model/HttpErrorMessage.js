"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpErrorMessage extends Error {
    constructor(name, statusCode, message, errorCode, payload) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;
        this.payload = payload;
        this.name = name;
        this.errorCode = errorCode;
    }
    toJSON() {
        if (this.errorCode != null) {
            return {
                statusCode: this.statusCode,
                error: this.name,
                message: this.message,
                errorCode: this.errorCode,
                payload: this.payload,
            };
        }
        else {
            return {
                statusCode: this.statusCode,
                error: this.name,
                message: this.message
            };
        }
    }
}
exports.HttpErrorMessage = HttpErrorMessage;
//# sourceMappingURL=HttpErrorMessage.js.map