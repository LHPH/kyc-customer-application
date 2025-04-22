import { KycUserRole } from "../enums/kyc-user-role.enum";


export default interface JwtData{

    owner: number;
    user: number;
    role: KycUserRole;
    channel: number;
}