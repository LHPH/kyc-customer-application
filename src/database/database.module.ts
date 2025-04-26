import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_SECRET'),
            database: configService.get('DATABASE_NAME'),
            logging: true,
            logger: 'simple-console',
            entities: [__dirname + '/../common/entities/*.{ts,js}'],
        }),
        inject: [ConfigService]
    })]
})
export class DatabaseModule {}
