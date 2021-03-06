'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const _ = require("lodash");
const return_types_1 = require("./model/return-types");
const server_types_1 = require("./model/server-types");
const parameter_processor_1 = require("./parameter-processor");
const server_container_1 = require("./server-container");
const errors_1 = require("./model/errors");
class ServiceInvoker {
    constructor(serviceClass, serviceMethod) {
        this.debugger = debug('typescript-rest:service-invoker:runtime');
        this.serviceClass = serviceClass;
        this.serviceMethod = serviceMethod;
        this.preProcessors = _.union(serviceMethod.preProcessors, serviceClass.preProcessors);
        this.postProcessors = _.union(serviceMethod.postProcessors, serviceClass.postProcessors);
    }
    callService(context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.callTargetEndPoint(context);
                if (this.mustCallNext()) {
                    context.next();
                }
                else if (this.debugger.enabled) {
                    this.debugger('Ignoring next middlewares');
                }
            }
            catch (err) {
                context.next(err);
            }
        });
    }
    mustCallNext() {
        return !server_container_1.ServerContainer.get().ignoreNextMiddlewares &&
            !this.serviceMethod.ignoreNextMiddlewares && !this.serviceClass.ignoreNextMiddlewares;
    }
    runPreProcessors(context) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugger('Running preprocessors');
            for (const processor of this.preProcessors) {
                yield Promise.resolve(processor(context.request, context.response));
            }
        });
    }
    runPostProcessors(context) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugger('Running postprocessors');
            for (const processor of this.postProcessors) {
                yield Promise.resolve(processor(context.request, context.response));
            }
        });
    }
    callTargetEndPoint(context) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugger('Calling targetEndpoint %s', this.serviceMethod.resolvedPath);
            this.checkAcceptance(context);
            if (this.preProcessors.length) {
                yield this.runPreProcessors(context);
            }
            const serviceObject = this.createService(context);
            const args = this.buildArgumentsList(context);
            const toCall = this.getMethodToCall();
            if (this.debugger.enabled) {
                this.debugger('Invoking service method <%s> with params: %j', this.serviceMethod.name, args);
            }
            const result = toCall.apply(serviceObject, args);
            if (this.postProcessors.length) {
                yield this.runPostProcessors(context);
            }
            this.processResponseHeaders(context);
            yield this.sendValue(result, context);
        });
    }
    getMethodToCall() {
        return this.serviceClass.targetClass.prototype[this.serviceMethod.name]
            || this.serviceClass.targetClass[this.serviceMethod.name];
    }
    checkAcceptance(context) {
        this.debugger('Verifying accept headers');
        this.identifyAcceptedLanguage(context);
        this.identifyAcceptedType(context);
        if (!context.accept) {
            throw new errors_1.NotAcceptableError('Accept');
        }
        if (!context.language) {
            throw new errors_1.NotAcceptableError('Accept-Language');
        }
    }
    identifyAcceptedLanguage(context) {
        if (this.serviceMethod.resolvedLanguages) {
            const lang = context.request.acceptsLanguages(this.serviceMethod.resolvedLanguages);
            if (lang) {
                context.language = lang;
            }
        }
        else {
            const languages = context.request.acceptsLanguages();
            if (languages && languages.length > 0) {
                context.language = languages[0];
            }
        }
        this.debugger('Identified the preferable language accepted by server: %s', context.language);
    }
    identifyAcceptedType(context) {
        if (this.serviceMethod.resolvedAccepts) {
            context.accept = context.request.accepts(this.serviceMethod.resolvedAccepts);
        }
        else {
            const accepts = context.request.accepts();
            if (accepts && accepts.length > 0) {
                context.accept = accepts[0];
            }
        }
        this.debugger('Identified the preferable media type accepted by server: %s', context.accept);
    }
    createService(context) {
        const serviceObject = server_container_1.ServerContainer.get().serviceFactory.create(this.serviceClass.targetClass, context);
        this.debugger('Creating service object');
        if (this.serviceClass.hasProperties()) {
            this.serviceClass.properties.forEach((property, key) => {
                this.debugger('Setting service property %s', key);
                serviceObject[key] = this.processParameter(context, property);
            });
        }
        return serviceObject;
    }
    buildArgumentsList(context) {
        const result = new Array();
        this.serviceMethod.parameters.forEach(param => {
            this.debugger('Processing service parameter [%s]', param.name || 'body');
            result.push(this.processParameter(context, {
                name: param.name,
                propertyType: param.type,
                type: param.paramType
            }));
        });
        return result;
    }
    processParameter(context, property) {
        return parameter_processor_1.ParameterProcessor.get().processParameter(context, property);
    }
    processResponseHeaders(context) {
        if (this.serviceMethod.resolvedLanguages) {
            if (this.serviceMethod.httpMethod === server_types_1.HttpMethod.GET) {
                this.debugger('Adding response header vary: Accept-Language');
                context.response.vary('Accept-Language');
            }
            this.debugger('Adding response header Content-Language: %s', context.language);
            context.response.set('Content-Language', context.language);
        }
        if (this.serviceMethod.resolvedAccepts) {
            if (this.serviceMethod.httpMethod === server_types_1.HttpMethod.GET) {
                this.debugger('Adding response header vary: Accept');
                context.response.vary('Accept');
            }
        }
    }
    sendValue(value, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value !== return_types_1.NoResponse) {
                this.debugger('Sending response value: %o', value);
                switch (typeof value) {
                    case 'number':
                        context.response.send(value.toString());
                        break;
                    case 'string':
                        context.response.send(value);
                        break;
                    case 'boolean':
                        context.response.send(value.toString());
                        break;
                    case 'undefined':
                        if (!context.response.headersSent) {
                            context.response.sendStatus(204);
                        }
                        break;
                    case null:
                        context.response.send(value);
                        break;
                    default:
                        yield this.sendComplexValue(context, value);
                }
            }
            else {
                this.debugger('Do not send any response value');
            }
        });
    }
    sendComplexValue(context, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.filePath && value instanceof return_types_1.DownloadResource) {
                yield this.downloadResToPromise(context.response, value);
            }
            else if (value instanceof return_types_1.DownloadBinaryData) {
                this.sendFile(context, value);
            }
            else if (value.location && value instanceof server_types_1.ReferencedResource) {
                yield this.sendReferencedResource(context, value);
            }
            else if (value.then && value.catch) {
                const val = yield value;
                yield this.sendValue(val, context);
            }
            else {
                this.debugger('Sending a json value: %j', value);
                context.response.json(value);
            }
        });
    }
    sendReferencedResource(context, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debugger('Setting the header Location: %s', value.location);
            this.debugger('Sendinf status code: %d', value.statusCode);
            context.response.set('Location', value.location);
            if (value.body) {
                context.response.status(value.statusCode);
                yield this.sendValue(value.body, context);
            }
            else {
                context.response.sendStatus(value.statusCode);
            }
        });
    }
    sendFile(context, value) {
        this.debugger('Sending file as response');
        if (value.fileName) {
            context.response.writeHead(200, {
                'Content-Length': value.content.length,
                'Content-Type': value.mimeType,
                'Content-disposition': 'attachment;filename=' + value.fileName
            });
        }
        else {
            context.response.writeHead(200, {
                'Content-Length': value.content.length,
                'Content-Type': value.mimeType
            });
        }
        context.response.end(value.content);
    }
    downloadResToPromise(res, value) {
        this.debugger('Sending a resource to download. Path: %s', value.filePath);
        return new Promise((resolve, reject) => {
            res.download(value.filePath, value.fileName || value.filePath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.ServiceInvoker = ServiceInvoker;
//# sourceMappingURL=service-invoker.js.map