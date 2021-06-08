import { APIClient, APIMapping } from '../../http';
import { TrashedEntitiesResponse, TrashedEntitiesSchemaNameResponse, TrashedEntityRequestItem } from './EntityBinService.Types';

export class EntityBinController extends APIClient {
    constructor() {
        super(APIMapping.entityBinService);
    }

    /**
     *
     * returns list of trashed entities
     *
     * @param page
     * @param size
     * @param schemaName
     */

    async getTrashedEntities(page: number, size = 50, schemaName?: string) {
        // if no schemaname all
        return this.invokeApiWithErrorHandling<TrashedEntitiesResponse>('/', 'GET', undefined, {
            queryParams: {
                page,
                size,
                schemaName,
            },
        });
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

    async completelyDeleteBin() {}

    async completelyRestoreBin() {}
}
