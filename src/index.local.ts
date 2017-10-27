import 'core-js';

import * as https from 'https';
import * as pem from 'pem';
import { LoggerInstance } from 'winston';
import { CommonConfig } from './config/CommonConfig';
import { ExpressServer } from './server/ExpressServer';
import { INJECTOR } from './util/di/Injector';
import { Logger } from './util/di/LoggerFactory';

const expressServer = INJECTOR.get(ExpressServer) as ExpressServer;
const config = INJECTOR.get(CommonConfig) as CommonConfig;
const logger = INJECTOR.get(Logger) as LoggerInstance;

const port = config.PORT;

if (!config.USE_HTTP) {
  pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
    if (err) {
      logger.error(err);
      throw err;
    }

    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, expressServer.app).listen(port);
  });
} else {
  expressServer.app.listen(port);
}

const protocolStr = config.USE_HTTP ? 'http' : 'https';
logger.info(`listening on ${protocolStr}://localhost:${port}${expressServer.basePath}/graphiql`);
