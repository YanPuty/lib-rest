'use strict';

import { ServerConfig } from './server/config';
import * as Return from './server/model/return-types';

export * from './decorators/parameters';
export * from "./server/model/errors";
export * from './decorators/methods';
export * from './decorators/services';
export * from './server/model/server-types';
export * from './server/server';
export * from './authenticator/passport';

export { Return };
export { DefaultServiceFactory } from './server/server-container';

ServerConfig.configure();
