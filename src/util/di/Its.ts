import {InjectionToken} from 'injection-js';

import * as express from 'express';
import * as winston from 'winston';
import { IUserModel } from '../../models/user-model/IUserModel';
import { IUserService } from '../../services/user-service/IUserService';

/* tslint:disable:variable-name */
// InjectionTokens, shorten the name for simpler @Inject(Its.xxx)
export class Its {
  public static readonly AwsExpressMiddleware = new InjectionToken<express.RequestHandler>('AwsExpressMiddleware');
  public static readonly Logger = new InjectionToken<winston.LoggerInstance>('Winston');

  // services
  public static readonly IUserService = new InjectionToken<IUserService>('IUserService');

  // models
  public static readonly IUserModel = new InjectionToken<IUserModel>('IUserModel');
}
/* tslint:enable:variable-name */
