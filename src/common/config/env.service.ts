import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  // application
  APP_ENV: string;
  APP_DEBUG: boolean;

  // database
  DB_NAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;

  // Mailer
  MAIL_SERVER: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;

  // SMS GATEWAY
  SMS_GATEWAY_KEY: string;

  // FireBase PUSH SERVER KEY
  FCM_SERVER_KEY: string;
}

export class EnvService {
  private vars: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false;
    this.vars = data as EnvData;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return (this.vars.APP_ENV === 'development');
  }

  isProd(): boolean {
    return (this.vars.APP_ENV === 'production');
  }
}
