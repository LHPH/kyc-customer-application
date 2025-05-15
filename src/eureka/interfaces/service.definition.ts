//From https://gitlab.com/fboisselier52/nestjs-eureka

export interface ServiceDefinition {
    name: string;
    host?: string;
    port: number;
  }