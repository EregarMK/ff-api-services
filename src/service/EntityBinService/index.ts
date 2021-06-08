import { EntityBinController } from './EntityBinController';

export default class EntityBinService {
    public static instance = new EntityBinService();

    public readonly entityBin: EntityBinController;

    constructor() {
        this.entityBin = new EntityBinController();
    }
}
