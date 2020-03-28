'use strict';

import { HttpCode } from "../../enums";

/**
 * The Base class for all HTTP errors
 */
export abstract class HttpError extends Error {

    constructor(name: string,
        public statusCode: number,
        public message: string,
        public errorCode?: number,
        public payload?: any) {
        super(message);
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
      } else {
        return {
          statusCode: this.statusCode,
          error: this.name,
          message: this.message
        };
      }
    }
}

/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
export class BadRequestError extends HttpError {
    constructor(message?: string, errorCode?: number) {
        super('BadRequestError', HttpCode.BadRequest, message, errorCode);
    }
}

/**
 * Represents an UNAUTHORIZED error. The request requires user authentication. The response
 * MUST include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource.
 */
export class UnauthorizedError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("UNAUTHORIZED", HttpCode.Unauthorized, message, errorCode);
    }
}

/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
export class ForbiddenError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("FORBIDDEN", HttpCode.ForbiddenError, message, errorCode);
    }
}

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
export class NotFoundError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("NOT_FOUND", HttpCode.NotFound, message, errorCode);
    }
}

export class MissingParamError extends HttpError {

  constructor(param: string, errorCode?: number) {
    super("BAD_REQUEST", HttpCode.BadRequest, `Missing request param '${param}'`, errorCode);
  }

}

/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
export class MethodNotAllowedError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("METHOD_NOT_ALLOWED", HttpCode.MethodNotAllowed, message, errorCode);
    }
}

/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
export class NotAcceptableError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("NOT_ACCEPTABLE", HttpCode.NotAcceptable, message, errorCode);
    }
}
/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
export class ConflictError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("CONFLICT_ERROR", HttpCode.ConflictError, message, errorCode);
    }
}

/**
 * Represents a GONE error. The requested resource is no longer available at the server
 * and no forwarding address is known. This condition is expected to be considered
 * permanent. Clients with link editing capabilities SHOULD delete references to
 * the Request-URI after user approval. If the server does not know, or has
 * no facility to determine, whether or not the condition is permanent, the
 * error 404 (NotFoundError) SHOULD be used instead. This response is
 * cacheable unless indicated otherwise.
 */
export class GoneError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("GONE_ERROR", HttpCode.GoneError, message, errorCode);
    }
}

/**
 * Represents an UNSUPPORTED MEDIA TYPE error. The server is refusing to service the request
 * because the entity of the request is in a format not supported by the requested resource
 * for the requested method.
 */
export class UnsupportedMediaTypeError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("UNSUPPORTED_MEDIATYPE_ERROR", HttpCode.UnsupportedMediaTypeError, message, errorCode);
    }
}

/**
 * Represents a UNPROCESSABLE ENTITY error. The server understands the content type of the request entity
 * (hence a 415 Unsupported Media Type status code is inappropriate), and the syntax of the request entity is correct
 * (thus a 400 Bad Request status code is inappropriate) but was unable to process the contained instructions.
 */
export class UnprocessableEntityError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("UNPROCESSABLE_ENTITY_ERROR", HttpCode.UnprocessableEntityError, message, errorCode);
    }
}

/**
 * Represents an INTERNAL SERVER error. The server encountered an unexpected condition
 * which prevented it from fulfilling the request.
 */
export class InternalServerError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("INTERNAL_SERVER_ERROR", HttpCode.InternalServerError, message, errorCode);
    }
}

/**
 * Represents a NOT IMPLEMENTED error. The server does not support the functionality required
 *  to fulfill the request. This is the appropriate response when the server does not recognize
 * the request method and is not capable of supporting it for any resource.
 */
export class NotImplementedError extends HttpError {
    constructor(message: string, errorCode?: number) {
      super("NOT_IMPLEMENTED_ERROR", HttpCode.NotImplementedError, message, errorCode);
    }
}
