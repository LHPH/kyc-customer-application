//Based in https://gitlab.com/fboisselier52/nestjs-eureka with minor changes 
// and replace eureka-js-client with fork @rocketsoftware/eureka-js-client'
import { EurekaModuleOptions } from './eureka.module.options';
export interface EurekaModuleOptionsFactory {
  /**
   * The function which returns the Terminus Options
   */
  createEurekaOptions(): Promise<EurekaModuleOptions> | EurekaModuleOptions;
}