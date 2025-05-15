//Based in https://gitlab.com/fboisselier52/nestjs-eureka and change eureka-js-client to fork @rocketsoftware/eureka-js-client'

import { Eureka } from '@rocketsoftware/eureka-js-client';
import { Logger } from '@nestjs/common';
import { EurekaModuleClientLogger } from '../interfaces/eureka.module.options';

export class ClientLogger implements EurekaModuleClientLogger {
  protected logger = new Logger(Eureka.name);

  warn(...args: any[]): void {
    this.callLogger('warn', args);
  }
  info(...args: any[]): void {
    this.callLogger('log', args);
  }
  debug(...args: any[]): void {
    this.callLogger('debug', args);
  }
  error(...args: any[]): void {
    this.callLogger('error', args);
  }

  private callLogger(level: 'warn' | 'log' | 'debug' | 'error', args: any[]) {
    this.logger[level](args.join(' '));
  }
}
