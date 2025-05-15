//Based in https://gitlab.com/fboisselier52/nestjs-eureka and change eureka-js-client to fork @rocketsoftware/eureka-js-client'

import {EurekaClient} from '@rocketsoftware/eureka-js-client'
import { ServiceDefinition } from './service.definition';

export interface EurekaModuleClientLogger {
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  error(...args: any[]): void;
}

/**
 * Same as EurekaClient.EurekaInstanceConfig but
 * all fields are optional to permits to override the instance configuration
 */
export interface EurekaInstanceConfigExtra {
  app?: string;
  hostName?: string;
  ipAddr?: string;
  vipAddress?: string;
  dataCenterInfo?: EurekaClient.DataCenterInfo;
  port?: number | EurekaClient.PortWrapper | EurekaClient.LegacyPortWrapper | undefined;
  instanceId?: string | undefined;
  appGroupName?: string | undefined;
  sid?: string | undefined;
  securePort?: number | EurekaClient.PortWrapper | EurekaClient.LegacyPortWrapper | undefined;
  homePageUrl?: string | undefined;
  statusPageUrl?: string | undefined;
  healthCheckUrl?: string | undefined;
  secureHealthCheckUrl?: string | undefined;
  secureVipAddress?: string | undefined;
  countryId?: number | undefined;
  status?: EurekaClient.InstanceStatus | undefined;
  overriddenstatus?: EurekaClient.InstanceStatus | undefined;
  leaseInfo?: EurekaClient.LeaseInfo | undefined;
  isCoordinatingDiscoveryServer?: boolean | undefined;
  lastUpdatedTimestamp?: number | undefined;
  lastDirtyTimestamp?: number | undefined;
  actionType?: EurekaClient.ActionType | undefined;
  metadata?: {
      [index: string]: string;
  } | undefined;
}

export interface EurekaModuleOptions {
  eureka?: EurekaClient.EurekaClientConfig;
  instanceExtra?: EurekaInstanceConfigExtra;
  service?: ServiceDefinition;
  disableDiscovery?: boolean;
  disable?: boolean;
  clientLogger?: EurekaModuleClientLogger;
}
