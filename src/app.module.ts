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
import { HealthController } from './health.controller';
import { EurekaModule } from './eureka/eureka.module';

@Module({
  imports: [CustomersModule, ExecutivesModule, DatabaseModule, CommonModule,TerminusModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [configuration,messages]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {

        const targets = [];
        targets.push(
          {
            target: 'pino-pretty',
            level: configService.get<string>('LOG_LEVEL') || 'info',
            options: {
              colorize: true,
              singleLine: true,
              timestampKey: 'time',
              ignore: 'pid,hostname',
              translateTime: 'yyyy-MM-dd HH:mm:ss'
            }
          }
        );

        const env = configService.get<string>('NODE_ENV') || 'development';
        if(env === 'production'){

          targets.push(
            {
              target: 'pino/file',
              level: configService.get<string>('LOG_LEVEL') || 'info',
              options:{
                destination: `${configService.get<string>('LOG_BASE_PATH')}/${configService.get<string>('APP_NAME')}.log`,
                mkdir: true
              }
            },
            {
              target: 'pino-roll',
              level: configService.get<string>('LOG_LEVEL') || 'info',
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
            level: configService.get<string>('LOG_LEVEL') || 'info',
            autoLogging: true,
            transport: { 
              targets: targets
            }
          }
        }
      }
    }),
    EurekaModule.forRoot({
      eureka:{
        host: 'localhost',
        port: 9100,
        registryFetchInterval: 1000,
        servicePath: '/eureka/apps',
        maxRetries: 3
      },
      service:{
        name: 'kyc-customer-application',
        port: 9010
      }
    })  
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
