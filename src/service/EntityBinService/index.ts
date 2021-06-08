import { EntityBinController } from './EntityBinController';

export * from './EntityBinService.Types';

export class EntityBinService {
    public readonly entityBin: EntityBinController;

    constructor() {
        this.entityBin = new EntityBinController();
    }
}

export const EntityBinServiceInstance = new EntityBinService();
