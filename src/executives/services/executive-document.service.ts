import { HttpStatus, Injectable } from "@nestjs/common";

import { KycMessagesService } from "src/common/services/kyc-message.service";
import Message  from "src/common/interfaces/message";
import { GetDocumentRequest, GetDocumentResponse } from "../interfaces/get-documents";
import RequestData from "src/common/interfaces/request-data";
import { KycReportService } from "src/api/services/kyc-reports.service";
import KycCustomerApplicationEntity from "src/common/entities/kyc-customer-application";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationFormRequest } from "src/api/document/interfaces/application-form";
import { Service } from "src/api/document/interfaces/service";
import KycCustomerServiceEntity from "src/common/entities/kyc-customer-service";
import { ContractRequest } from "src/api/document/interfaces/contract";
import { MessageCodes } from "src/common/enums/message-codes";
import { KycRestException } from "src/common/exception/kyc-rest-exception.exception";

@Injectable()
export default class ExecutiveDocumentService{

    constructor(
        @InjectRepository(KycCustomerApplicationEntity)
        private kycCustomerApplicationRepository: Repository<KycCustomerApplicationEntity>,
        private kycReportService: KycReportService,
        private kycMessagesService: KycMessagesService){}

    async generateDocumentForContractingServices(requestData: RequestData<GetDocumentRequest>): Promise<GetDocumentResponse>{

        const data: GetDocumentRequest = requestData.data!;
        const auth = requestData.auth;

        return this.kycCustomerApplicationRepository.find(
            {
                relations:{
                    services: true
                },
                where: {
                    id: data.folio,
                    customer: {
                        id: data.customerId
                    },
                    services:{
                        active: true
                    },
                },
                order:{
                    id: "DESC"
                },
                take: 1
            })
            .then(results => {

                if(!results.length){

                    const notification: Message = this.kycMessagesService.getMessage(MessageCodes.FOLIO_NOT_FOUND);
                    throw new KycRestException({message: notification, status: HttpStatus.UNPROCESSABLE_ENTITY });
                }

                results.map(result => {

                    const contractedServices: KycCustomerServiceEntity[] = result.services;

                    let total = 0;
                    const services: Service[] = contractedServices.map(contractedService => {

                        total = total + contractedService.serviceCost;
                        return {
                            id: contractedService.service.id,
                            cost: contractedService.serviceCost,
                            name: contractedService.service.name
                        }
                    });

                    const customerName = `${result.customer.firstName} ${result.customer.secondName || ''}` 
                            +`${result.customer.lastName} ${result.customer.secondLastName || ''}`.trim();

                    const customerAddress = `${result.customer.address.street} ${result.customer.address.streetNumber}, ${result.customer.address.postalCode}`;

                    const applicationFormRequest: ApplicationFormRequest = {
                        folio: result.id!,
                        dateApplication: result.creationDate?.toISOString()!,
                        total,
                        campaign: result.offer?.campaign?.id,
                        customerNumber: result.customer.id,
                        customerName,
                        customerAddress,
                        customerPhone: result.customer.cellPhone,
                        customerEmail: result.customer.email,
                        customerRfc: result.customer.rfc,
                        executiveName: `${result.executive.firstName} ${result.executive.lastName}`,
                        idExecutive: result.executive.id,
                        idBranch: result.office.id,
                        branchName: result.office.name,
                        acceptPromotions: result.promotions.acceptPromotions,
                        acceptPromotionsEmail: result.promotions.acceptPromotionsEmail,
                        acceptPromotionsCellPhone: result.promotions.acceptPromotionsCellPhone,
                        services
                    }

                    const contractRequest: ContractRequest = {
                        folio: result.id!,
                        customerNumber: result.customer.id,
                        customerName,
                        customerAddress,
                        contractedServices: services
                    }

                    this.kycReportService.createApplicationFormDocument({data: applicationFormRequest, auth});
                    this.kycReportService.createContractDocument({data: contractRequest, auth});

                });

                return {documents: []};
            });
    }
}