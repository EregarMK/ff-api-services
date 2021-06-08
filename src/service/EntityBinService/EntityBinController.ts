import { APIClient, APIMapping } from '../../http';
import { TrashedEntitiesResponse, TrashedEntitiesSchemaNameResponse, TrashedEntityRequestItem } from './EntityBinService.Types';

import { trashedEntities } from './mock';

export class EntityBinController extends APIClient {
    constructor() {
        super(APIMapping.entityBinService);
    }

    /**
     *
     * returns list of trashed entities
     *
     * @param page
     * @param pageSize
     * @param schemaName
     */

    async getTrashedEntities(page: number, pageSize: number, schemaName?: string) {
        return this.invokeApiWithErrorHandling<TrashedEntitiesResponse>(
            '/',
            'GET',
            undefined,
            {
                queryParams: {
                    page,
                    pageSize,
                    schemaName,
                },
            },
            trashedEntities
        );
    }

    /**
     *
     * delete trashed entities
     *
     * @param toBeDeletedEntities
     */

    async deleteTrashedEntities(toBeDeletedEntities: TrashedEntityRequestItem[]) {
        return this.invokeApiWithErrorHandling('/', 'DELETE', { entities: toBeDeletedEntities });
    }

    /**
     *
     * restores trashed entities
     *
     * @param toBeRestoredEntities
     */

    async restoreTrashedEntities(toBeRestoredEntities: TrashedEntityRequestItem[]) {
        return this.invokeApiWithErrorHandling('/', 'POST', { entities: toBeRestoredEntities });
    }

    /**
     *
     * returns array of schema names of trashed entities
     *
     */

    async getTrashedEntitySchemaNames() {
        return this.invokeApiWithErrorHandling<TrashedEntitiesSchemaNameResponse>('/', 'GET');
    }
}
