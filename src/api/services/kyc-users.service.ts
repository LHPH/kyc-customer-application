import { HttpService } from "@nestjs/axios";
import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import SessionChecking from "src/common/auth/session-checking";
import { KycUserRole } from "src/common/enums/kyc-user-role";
import { MessageCodes } from "src/common/enums/message-codes";
import { KycRestException } from "src/common/exception/kyc-rest-exception.exception";
import JwtData from "src/common/interfaces/jwt-data";
import Message from "src/common/interfaces/message";
import ResponseData from "src/common/interfaces/response-data";
import { KycMessagesService } from "src/common/services/kyc-message.service";
import { DiscoveryService } from "src/eureka/discovery/discovery.service";


@Injectable()
export class KycUserService implements SessionChecking{

    private readonly logger = new Logger(KycUserService.name);
    
    private readonly SERVICE_NAME = 'KYC-USERS';

    constructor(
        discoveryService: DiscoveryService,
        private httpService: HttpService,
        private kycMessagesService: KycMessagesService
    ){}

    async sessionChecking(token: string): Promise<JwtData> {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        const hostname = 'http://localhost:9004';

        this.logger.log('Call service to check session');

        const { data } = await firstValueFrom(
            this.httpService.get<ResponseData<JwtData>>(`${hostname}/user/session-checking`,{headers})
            .pipe(catchError((error: AxiosError) => {

                const notification: Message = this.kycMessagesService.getMessage(MessageCodes.UNAUTHORIZED);
                throw new KycRestException({message: notification, status: HttpStatus.UNAUTHORIZED, error})
            }))
        );

        return data.data!

        /*const jwtData: JwtData = {
            owner: 5,
            user: 1,
            role: KycUserRole.CUSTOMER,
            channel: 1
        }
        return Promise.resolve(jwtData);*/
    }

}