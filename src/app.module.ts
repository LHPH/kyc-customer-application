import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ExecutivesModule } from './executives/executives.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { TerminusModule } from '@nestjs/terminus';
import configuration from './config/configuration';
import messages from './config/yml-message-loader';
import services from './config/services-catalog-loader';
import { HealthController } from './health.controller';
import { EurekaModule } from './eureka/eureka.module';
import { ApiModule } from './api/api.module';
import { parseStringToBoolean } from './common/util/functions.util';

@Module({
  imports: [CustomersModule, ExecutivesModule, DatabaseModule, CommonModule,TerminusModule, ApiModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [configuration,messages,services]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {

        const targets = [];
        const logLevel = configService.get<string>('LOG_LEVEL') || 'info';
        targets.push(
          {
            target: 'pino-pretty',
            level: logLevel,
            options: {
              colorize: true,
              singleLine: true,
              timestampKey: 'time',
              ignore: 'pid,hostname',
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss'
            }
          }
        );

        const env = configService.get<string>('NODE_ENV') || 'development';
        if(env === 'production'){

          targets.push(
            {
              target: 'pino/file',
              level: logLevel,
              options:{
                destination: `${configService.get<string>('LOG_BASE_PATH')}/${configService.get<string>('APP_NAME')}.log`,
                mkdir: true
              }
            },
            {
              target: 'pino-roll',
              level: logLevel,
              options:{
                file: `${configService.get<string>('LOG_BASE_PATH')}/${configService.get<string>('APP_NAME')}/app`,
                size: '50m',
                frequency: 'daily',
                extension: '.log',
                mkdir: true,
                dateFormat: 'yyyy-MM-dd',
                limit: {
                  count: 30
                }
              }
            }
        );
        } 
        
        return {
          pinoHttp: {
            level: logLevel,
            autoLogging: true,
            transport: { 
              targets: targets
            }
          }
        }
      }
    }),
    EurekaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {

        return {
          eureka:{
            host: configService.get<string>('EUREKA_HOST'),
            port: configService.get<number>('EUREKA_PORT'),
            registryFetchInterval: 30000,
            servicePath: '/eureka/apps',
            maxRetries: 4,
            requestRetryDelay: 5000 
          },
          service:{
            name: 'kyc-customer-application',
            port: configService.get<number>('PORT') ?? 9010
          },
          disable: !parseStringToBoolean(configService.get<string>('ENABLE_EUREKA'))
        }
      }
    })  
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
