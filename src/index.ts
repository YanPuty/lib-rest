import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Server, NotFoundError, InternalServerError, HttpError } from "./rest"
import controllers from "./controller";


class Servers {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
    
    
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

    private routes() {
        Server.buildServices(this.app, ...controllers);
        this.registerHandlers();
    }

    private registerHandlers() {
      // catch 404 and forward to error handler
      this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        const err = new NotFoundError("Not found");
        next(err);
      });
  
      // catch exceptions
      this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        // Handle known exceptions
        if (err instanceof HttpError) {
          const httpError = err as HttpError;
          res
            .status(httpError.statusCode)
            .json(httpError.toJSON());
          return;
        }
        // Handle uncaught or unknown exceptions
        if (err instanceof Error) {
          const error = new InternalServerError(`Uncaught Exception: ${err.message}`);
          res
            .status(500)
            .json(error.toJSON());
        }
        next(err);
      });
    }

    public start() {
        const port = 3000;
        this.app.listen( port, () => {
            this.routes();
            console.log( `server started at http://localhost:${ port }` );
        } );
    }
    
}
const server = new Servers();
server.start();