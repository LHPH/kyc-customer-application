import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { KycUserRole } from "../enums/kyc-user-role";
import { AuthGuard } from "./auth.guard";


export const PreAuthorize = (...roles: KycUserRole[]) => {

    return applyDecorators(
        SetMetadata('roles',roles),
        UseGuards(AuthGuard)
    );
}