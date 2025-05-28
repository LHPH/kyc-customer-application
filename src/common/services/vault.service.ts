import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import * as vault from 'node-vault';

@Injectable()
export class VaultService{

    private readonly vaultClient: vault.client;
    private readonly logger = new Logger(VaultService.name);

    constructor(private configService: ConfigService){

        this.vaultClient = vault({
            endpoint: configService.get<string>('VAULT_ADDR'),
        })
    }

    async readSecrets(secretPath: string){

        try{
            
            this.logger.log('Fetching params for vault');
            const roleId: string = this.configService.get<string>('VAULT_ROLE_ID') ?? '';
            const secretId: string = this.configService.get<string>('VAULT_SECRET_ID') ?? '';

            this.logger.log('Login in vault')
            const loginResult = await this.vaultClient.approleLogin({
                role_id: roleId,
                secret_id: secretId 
            });

            this.logger.debug(`Result Login Vault ${JSON.stringify(loginResult)}`);
            this.vaultClient.token = loginResult.auth.client_token;
            this.logger.debug(`The token is ${this.vaultClient.token}`);


            this.logger.log('Reading secrets of vault')
            const secretData = await this.vaultClient.read(secretPath);
            this.logger.debug(`The secrets in ${secretPath} are ${JSON.stringify(secretData.data)}`);

            this.logger.log('Returning secrets of vault');
            return secretData.data;
        }
        catch(error){

            this.logger.error(error);
            throw error;
        }
    }



}