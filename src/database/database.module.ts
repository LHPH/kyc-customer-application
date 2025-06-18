import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { VaultService } from 'src/common/services/vault.service';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule, CommonModule],
        useFactory: async (configService: ConfigService, vaultService: VaultService) => {

            const env = configService.get<string>('NODE_ENV');
            let username;
            let secret;

            console.log('ENV ',env);
            if(env === 'production'){

                const result = await vaultService.readSecrets(configService.get<string>('VAULT_SECRET_PATH')!);
                const { DATABASE_USER, DATABASE_SECRET} = result.data;
                username = DATABASE_USER;
                secret = DATABASE_SECRET;
                console.log('username ',username);
                console.log('secret ',secret);
            }
            else{
                username = configService.get('DATABASE_USER')
                secret = configService.get('DATABASE_SECRET');
            }

            console.log('username ',username);
            console.log('secret ',secret);

            return {
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: +configService.get('DATABASE_PORT'),
                username,
                password: secret,
                database: configService.get('DATABASE_NAME'),
                logging: true,
                logger: 'simple-console',
                entities: [__dirname + '/../common/entities/*.{ts,js}'],
            }
        },
        inject: [ConfigService, VaultService]
    })]
})
export class DatabaseModule {}
