"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const rest_1 = require("./rest");
const controller_1 = require("./controller");
class Servers {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        // add static paths
        // configure view
        this.app.set("view engine", "ejs");
        // use logger middlware
        this.app.use(logger("dev"));
        // use json form parser middlware
        this.app.use(bodyParser.json());
        // use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // use cookie parser middleware
        // Enable cross-origin only for test and stage
        this.app.use(cors());
    }
    routes() {
        rest_1.Server.buildServices(this.app, ...controller_1.default);
        this.registerHandlers();
    }
    registerHandlers() {
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            const err = new rest_1.NotFoundError("Not found");
            next(err);
        });
        // catch exceptions
        this.app.use((err, req, res, next) => {
            // Handle known exceptions
            if (err instanceof rest_1.HttpError) {
                const httpError = err;
                res
                    .status(httpError.statusCode)
                    .json(httpError.toJSON());
                return;
            }
            // Handle uncaught or unknown exceptions
            if (err instanceof Error) {
                const error = new rest_1.InternalServerError(`Uncaught Exception: ${err.message}`);
                res
                    .status(500)
                    .json(error.toJSON());
            }
            next(err);
        });
    }
    start() {
        const port = 3000;
        this.app.listen(port, () => {
            this.routes();
            console.log(`server started at http://localhost:${port}`);
        });
    }
}
const server = new Servers();
server.start();
//# sourceMappingURL=index.js.map