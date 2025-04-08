import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ExecutivesModule } from './executives/executives.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [CustomersModule, ExecutivesModule, DatabaseModule, CommonModule,
    ConfigModule.forRoot({load: [configuration]})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
