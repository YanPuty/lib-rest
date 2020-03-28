"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["BadRequest"] = 400] = "BadRequest";
    HttpCode[HttpCode["Unauthorized"] = 401] = "Unauthorized";
    HttpCode[HttpCode["Unauthenticated"] = 403] = "Unauthenticated";
    HttpCode[HttpCode["ForbiddenError"] = 403] = "ForbiddenError";
    HttpCode[HttpCode["NotFound"] = 404] = "NotFound";
    HttpCode[HttpCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCode[HttpCode["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCode[HttpCode["EntityTooLarge"] = 413] = "EntityTooLarge";
    HttpCode[HttpCode["InternalServerError"] = 500] = "InternalServerError";
    HttpCode[HttpCode["ValidationError"] = 422] = "ValidationError";
    HttpCode[HttpCode["ConflictError"] = 409] = "ConflictError";
    HttpCode[HttpCode["GoneError"] = 410] = "GoneError";
    HttpCode[HttpCode["UnsupportedMediaTypeError"] = 415] = "UnsupportedMediaTypeError";
    HttpCode[HttpCode["UnprocessableEntityError"] = 422] = "UnprocessableEntityError";
    HttpCode[HttpCode["NotImplementedError"] = 501] = "NotImplementedError";
})(HttpCode = exports.HttpCode || (exports.HttpCode = {}));
//# sourceMappingURL=HttpCode.js.map