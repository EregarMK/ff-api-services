import {AxiosResponse} from "axios";

declare module 'ff-api-services' {
    interface EmailServiceVerifyDnsEntry {
        valid: boolean;
        type: "a" | "cname";
        host: string;
        data: string;
    }

    interface EmailServiceVerifyResponse {
        domain: string;
        valid: boolean;
        dnsEntries: EmailServiceVerifyDnsEntry[];
    }

    interface FunnelServiceStatisticsResponse {
        funnelId: string;
        funnelName: string;
        statistics: Array<{name: string; value: string}>;
        stageStatisticList: Array<FunnelServiceStatisticResponse>;
    }

    interface FunnelServiceStatisticResponse {
        nameOfStage: string;
        statistics: Array<{name: string; value: string}>
    }

    interface FunnelServiceCreateRequest {
        description: string;
        name: string;
        schemaId: string;
    }


    interface FunnelServiceCreateResponse {
        description: string;
        id: string;
        name: string;
        ownerId: string;
        schemaId: string;
        stages: any; // TODO Check this, i only guessed this.
        state: string; // TODO Check this, i only guessed this.
        timestamp: number;
    }

    interface CreateAdminTokenRequest {
        targetProductLocation: string;
        sourceContractId: string;
        sourceUsername: string;
        sourcePassword:string;
    }

    export class EmailService {
        static createDomain(domain: string): Promise<EmailServiceVerifyResponse>;
        static verifyDomain(domain: string): Promise<EmailServiceVerifyResponse>;
    }

    export class FunnelService {
        static getPossibleTags(funnelId: string): Promise<string[]>;
        static getKeysForTag(funnelId: string, tagName: string): Promise<string[]>;
        static getValuesForTagKey(funnelId: string, tagName: string, metadataKey: string): Promise<string[]>;
        static getFunnelStatistics(funnelId: string): Promise<FunnelServiceStatisticsResponse>;
        static getFunnelStageEntities(funnelId: string, stageId: string, page?: number, size?: number): Promise<any>;

        static createFunnel(funnelToCreate: FunnelServiceCreateRequest): Promise<FunnelServiceCreateResponse>;
        // TODO These must still be defined
        static findFunnelById(funnelId: string): Promise<any>;
        static deleteFunnelById(funnelId: string): Promise<any>;
        static getAllStagesOfAnFunnel(funnelId: string): Promise<any>;
        static addStageAtTheEndOfTheFunnel(funnelId: string, stage: object): Promise<any>;
        static findStageById(funnelId: string, stageId: object): Promise<any>;
        static addStageAfterGivenStageOfGivenFunnel(funnelId: object, stageId: object, stage: object): Promise<any>;
        static changeAStagesOfAFunnel(funnelId: string, stageId: object, stage: object): Promise<any>;
        static deleteStageFromFunnel(funnelId: string, stageId: object): Promise<any>;
        static getStateOfTheFunnel(funnelId: string): Promise<any>;
        static changeStateOfTheFunnel(funnelId: string, state: object): Promise<any>;
        static getAllActions(type: string): Promise<any>;
        static executeActionForEntity(action: object, schemaId: string, entityId: string): Promise<any>;
        static getDashboardInformation(state: object): Promise<any>;
        static getAvailableEntryConditionsForSchema(schemaId: string): Promise<any>;
        static getAvailableEntryConditionsForPrevStage(funnelId: string, stageId: object): Promise<any>;
        static updateFunnelById(funnelId: string, data: object): Promise<any>;
        static setStageAsFirstStage(funnelId: string, stageId: object): Promise<any>;
        static setStageAfterStage(funnelId: string, stageId: object, parentId: string): Promise<any>;
    }

    export interface ShortViewDefinition {
        id: string;
        name: string;
        schemaId: string;
    }

    interface EntityFieldValue {
        value: any;
    }

    interface EntityFieldSettings {
        captions: {[key: string]: string};
        type: string;
        unit?: string;
    }

    interface EntityField {
        values: EntityFieldValue[];
        settings: EntityFieldSettings;
    }

    export interface ViewDefinitionCategory {
        name: string;
        fields: EntityField[];
    }

    export interface ViewDefinition extends ShortViewDefinition {
        componentId: string;
        categories: ViewDefinitionCategory[];
    }

    export class ViewDefinitionService {
        static getDefinitionsForSchema(schemaId: string): Promise<AxiosResponse>;
        static getDefinition(viewDefinitionId: string): Promise<ViewDefinition>;
        static updateCategory(viewId: string, categoryName: string, categoryDefinition: ViewDefinitionCategory): Promise<any>;
    }

    export class UserService {
        static createUser(companyID: string, mailAddress: string, firstName: string, lastName: string): Promise<any>;
        static getCurrentUser(): Promise<any>;
        static postImage(image: any): Promise<any>;
        static updateUser(user: any): Promise<any>;
    }

    export class FlowfactExportInternalService {
        static createAdminUser(createAdminTokenRequest: CreateAdminTokenRequest): Promise<any>;
    }

    export class SearchService {
        static getSearches(): Promise<any>;
        static getSearch(searchId: string): Promise<any>;
        static saveSearch(searchModel: any): Promise<any>;
        static deleteSearch(searchId: string): Promise<any>;
        static updateSearch(searchId: string, searchModel: string): Promise<any>;
        static search(query: any, index: string, page: number, size: number): Promise<any>;
        static filter(index: string, page?: number, size?: number, filter?: any): Promise<any>;
    }

    export class MyFLOWFACTService {
        static doOrder(order: object): Promise<any>;
        static getProductPrice(productName: string): Promise<any>;
    }

    export class EntityService {
        static createEntity(schemaId: string, entity?: object): Promise<any>;
        static deleteEntity(entityId: string, schemaId: string): Promise<any>;
        static updateEntityField(schemaId: string, entityId: string, field: object): Promise<any>;
        static getEntityWithViewDefinition(viewId: string, schemaId: string, entityId: string): Promise<any>;
        static getEntity(schemaId: string, entityId: string): Promise<any>;
        static getHistory(schemaId: string, entityId: string, page: number): Promise<any>;

    }

    export class CognitoServiceClass {
        getValidSession(): Promise<any>;
        setNewLoginData(idToken: string): void;
        login(username: string, password: string): Promise<any>;
        tryGetUser(): Boolean;
        signOut(): void;
    }

    export const CognitoService: CognitoServiceClass;

    export interface MandatoryElkData {
        message: string;
        Severity: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
        SenderName: string;
        SenderVersion: string;
        product: string;
    }

    export interface FFAdditionalElkData {
        SenderFramework?: string;
        stage?: string;
        facility?: string;
        timestamp?: number;
        requestURI?: string;
        receivedStatusCode?: number;
        sentStatusCode?: number;
        location?: string;
        userId?: string;
        companyId?: string;
        requestId?: string;
    }

    export type FFElkData = MandatoryElkData & FFAdditionalElkData;

    export class RelogService {
        static log(logEntry: FFElkData): Promise<any>;
        static logBatch(logEntries: FFElkData[]): Promise<any>;
    }
}
