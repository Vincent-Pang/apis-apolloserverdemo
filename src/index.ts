import 'core-js';

import * as awsServerlessExpress from 'aws-serverless-express';
import { ExpressServer } from './app';
import { INJECTOR } from './util/di/Injector';

const expressServer = INJECTOR.get(ExpressServer) as ExpressServer;

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];
const server = awsServerlessExpress.createServer(expressServer.app, undefined, binaryMimeTypes);

exports.handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) => {
  console.log(JSON.stringify(event));
  console.log('hello');
  return awsServerlessExpress.proxy(server, event, context);
};
