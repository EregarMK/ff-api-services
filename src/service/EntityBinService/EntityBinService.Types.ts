import { Entity } from '@flowfact/types';

export interface TrashedEntity {
    content: Entity;
    schemaName: string;
    entityId: string;
    deletionDate: number;
    deleterId: string;
    title: string;
}

export interface TrashedEntitiesResponse {
    entries: TrashedEntity[];
    totalCount: number;
    page: number;
    pageSize: number;
    offset: number;
    size: number;
}

export interface TrashedEntityRequestItem {
    entityId: string;
    schema: string;
}

export interface TrashedEntitiesSchemaNameResponse {
    schemas: string[];
}
