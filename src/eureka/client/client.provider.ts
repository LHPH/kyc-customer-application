//Based in https://gitlab.com/fboisselier52/nestjs-eureka and change eureka-js-client to fork @rocketsoftware/eureka-js-client'
//and make a few changes due the upgrade and recent versions dependencies

import { Provider } from '@nestjs/common';
import { Eureka } from '@rocketsoftware/eureka-js-client';
import { EurekaModuleOptions } from '../interfaces/eureka.module.options';
import { ClientLogger } from './client.logger';
import internalIp from 'internal-ip';

const myIp:string = internalIp.internalIpV4Sync() ?? '127.0.0.1';

export const EUREKA_MODULE_OPTIONS = 'EUREKA_MODULE_OPTIONS';

export const eurekaClientProvider: Provider = {
  provide: Eureka,
  useFactory: (options: EurekaModuleOptions): Eureka | undefined => {
    if (!options || options.disable) {
      return undefined;
    }
    if (!options.eureka || !options.service) {
      throw new Error('EurekaModuleOptions has no eureka and service options');
    }
    return getEurekaProvider(options);
  },
  inject: [EUREKA_MODULE_OPTIONS],
};

function getEurekaProvider(options: EurekaModuleOptions): Eureka {

  const host = options.service?.host || myIp;
  const instanceName = options.service?.name || 'UNKNOWN-SERVICE';
  const instancePort = options.service?.port || 8080;

  return new Eureka({
    instance: {
      instanceId: `${myIp}:${instanceName}:${instancePort}`,
      app: options.service?.name!,
      hostName: host,
      ipAddr: host,
      port: {
        // prettier-ignore
        '$': instancePort,
        '@enabled': true,
      },
      vipAddress: options.service?.name.toLowerCase()!,
      healthCheckUrl: `http://${host}:${instancePort}/health`,
      homePageUrl: `http://${host}:${instancePort}/`,
      statusPageUrl: `http://${host}:${instancePort}/info`,
      dataCenterInfo: {
        // prettier-ignore
        'name': 'MyOwn',
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      },
      metadata: {},
      ...options.instanceExtra,
    },
    eureka: options.eureka!,
    logger: options.clientLogger || new ClientLogger(),
  });
}
