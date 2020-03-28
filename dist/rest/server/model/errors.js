'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
/**
 * The Base class for all HTTP errors
 */
class HttpError extends Error {
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
exports.HttpError = HttpError;
/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
class BadRequestError extends HttpError {
    constructor(message, errorCode) {
        super('BadRequestError', enums_1.HttpCode.BadRequest, message, errorCode);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * Represents an UNAUTHORIZED error. The request requires user authentication. The response
 * MUST include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource.
 */
class UnauthorizedError extends HttpError {
    constructor(message, errorCode) {
        super("UNAUTHORIZED", enums_1.HttpCode.Unauthorized, message, errorCode);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
class ForbiddenError extends HttpError {
    constructor(message, errorCode) {
        super("FORBIDDEN", enums_1.HttpCode.ForbiddenError, message, errorCode);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Represents a NOT FOUND error. The server has not found anything matching
 * the Request-URI. No indication is given of whether the condition is temporary
 * or permanent. The 410 (GoneError) status code SHOULD be used if the server knows,
 * through some internally configurable mechanism, that an old resource is permanently
 * unavailable and has no forwarding address.
 *
 * This error is commonly used when
 * the server does not wish to reveal exactly why the request has been refused,
 * or when no other response is applicable.
 */
class NotFoundError extends HttpError {
    constructor(message, errorCode) {
        super("NOT_FOUND", enums_1.HttpCode.NotFound, message, errorCode);
    }
}
exports.NotFoundError = NotFoundError;
class MissingParamError extends HttpError {
    constructor(param, errorCode) {
        super("BAD_REQUEST", enums_1.HttpCode.BadRequest, `Missing request param '${param}'`, errorCode);
    }
}
exports.MissingParamError = MissingParamError;
/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
class MethodNotAllowedError extends HttpError {
    constructor(message, errorCode) {
        super("METHOD_NOT_ALLOWED", enums_1.HttpCode.MethodNotAllowed, message, errorCode);
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;
/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
class NotAcceptableError extends HttpError {
    constructor(message, errorCode) {
        super("NOT_ACCEPTABLE", enums_1.HttpCode.NotAcceptable, message, errorCode);
    }
}
exports.NotAcceptableError = NotAcceptableError;
/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
class ConflictError extends HttpError {
    constructor(message, errorCode) {
        super("CONFLICT_ERROR", enums_1.HttpCode.ConflictError, message, errorCode);
    }
}
exports.ConflictError = ConflictError;
/**
 * Represents a GONE error. The requested resource is no longer available at the server
 * and no forwarding address is known. This condition is expected to be considered
 * permanent. Clients with link editing capabilities SHOULD delete references to
 * the Request-URI after user approval. If the server does not know, or has
 * no facility to determine, whether or not the condition is permanent, the
 * error 404 (NotFoundError) SHOULD be used instead. This response is
 * cacheable unless indicated otherwise.
 */
class GoneError extends HttpError {
    constructor(message, errorCode) {
        super("GONE_ERROR", enums_1.HttpCode.GoneError, message, errorCode);
    }
}
exports.GoneError = GoneError;
/**
 * Represents an UNSUPPORTED MEDIA TYPE error. The server is refusing to service the request
 * because the entity of the request is in a format not supported by the requested resource
 * for the requested method.
 */
class UnsupportedMediaTypeError extends HttpError {
    constructor(message, errorCode) {
        super("UNSUPPORTED_MEDIATYPE_ERROR", enums_1.HttpCode.UnsupportedMediaTypeError, message, errorCode);
    }
}
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;
/**
 * Represents a UNPROCESSABLE ENTITY error. The server understands the content type of the request entity
 * (hence a 415 Unsupported Media Type status code is inappropriate), and the syntax of the request entity is correct
 * (thus a 400 Bad Request status code is inappropriate) but was unable to process the contained instructions.
 */
class UnprocessableEntityError extends HttpError {
    constructor(message, errorCode) {
        super("UNPROCESSABLE_ENTITY_ERROR", enums_1.HttpCode.UnprocessableEntityError, message, errorCode);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
/**
 * Represents an INTERNAL SERVER error. The server encountered an unexpected condition
 * which prevented it from fulfilling the request.
 */
class InternalServerError extends HttpError {
    constructor(message, errorCode) {
        super("INTERNAL_SERVER_ERROR", enums_1.HttpCode.InternalServerError, message, errorCode);
    }
}
exports.InternalServerError = InternalServerError;
/**
 * Represents a NOT IMPLEMENTED error. The server does not support the functionality required
 *  to fulfill the request. This is the appropriate response when the server does not recognize
 * the request method and is not capable of supporting it for any resource.
 */
class NotImplementedError extends HttpError {
    constructor(message, errorCode) {
        super("NOT_IMPLEMENTED_ERROR", enums_1.HttpCode.NotImplementedError, message, errorCode);
    }
}
exports.NotImplementedError = NotImplementedError;
//# sourceMappingURL=errors.js.map