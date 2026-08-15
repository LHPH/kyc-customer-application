//Based in https://gitlab.com/fboisselier52/nestjs-eureka and change eureka-js-client to fork @rocketsoftware/eureka-js-client'
import { HttpService } from '@nestjs/axios';
import { OnApplicationBootstrap, Logger, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { AxiosRequestConfig, AxiosRequestHeaders  } from 'axios';
import { DiscoveryService } from './discovery.service';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders
}

@Injectable()
export class DiscoveryInterceptor implements OnApplicationBootstrap, OnApplicationShutdown {
  protected logger: Logger = new Logger(DiscoveryInterceptor.name);

  private interceptorNumber: number;

  constructor(protected readonly httpService: HttpService, protected readonly discoveryService: DiscoveryService) {}

  onApplicationBootstrap() {
    this.logger.debug('Injecting interceptor');
    this.interceptorNumber = this.httpService.axiosRef.interceptors.request.use(this.mapHostnameInterceptor.bind(this));
  }

  onApplicationShutdown() {
    this.logger.debug('Eject interceptor');
    this.httpService.axiosRef.interceptors.request.eject(this.interceptorNumber);
  }

  private mapHostnameInterceptor(config: AdaptAxiosRequestConfig): AdaptAxiosRequestConfig {
    const url = new URL(this.buildFullPath(config.baseURL, config.url ?? ''));
    this.logger.debug(`Resolving URL : ${url}`);
    const target = this.discoveryService.resolveHostname(url.hostname);
    if (target) {
      url.hostname = target.host;
      url.port = target.port.toString();
    }
    config.url = url.toJSON();
    return config;
  }

  // from https://github.com/axios/axios/blob/master/lib/core/buildFullPath.js
  private buildFullPath(baseURL: string | undefined, requestedURL: string): string {
    if (baseURL && !this.isAbsoluteURL(requestedURL)) {
      return this.combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  // from https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js
  private combineURLs(baseURL: string, relativeURL: string): string {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }

  // from https://github.com/axios/axios/blob/master/lib/helpers/isAbsoluteURL.js
  private isAbsoluteURL(url: string): boolean {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  }
}

