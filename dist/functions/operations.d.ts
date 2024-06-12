import { Collection } from 'mongodb';
export declare const insertOneInDb: (collection: Collection, insertedData: any) => Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
export declare const insertManyInDb: (collection: Collection, insertedData: any) => Promise<import("mongodb").InsertManyResult<import("bson").Document>>;
export declare const updateOneById: (collection: Collection, id: string, updateData: any) => Promise<import("mongodb").UpdateResult<import("bson").Document>>;
export declare const updateManyDocuments: (collection: Collection, updatedData: any, query?: {}) => Promise<import("mongodb").UpdateResult<import("bson").Document>>;
export declare const findAllDocuments: (collection: Collection, sortingOrder?: any) => Promise<import("mongodb").WithId<import("bson").Document>[]>;
export declare const findDocumentsWithPagination: (collection: Collection, limit?: number, skip?: number, sortingOrder?: any) => Promise<import("mongodb").WithId<import("bson").Document>[]>;
export declare const searchDocuments: (collection: Collection, searchedInput: string, keyName: string) => Promise<import("mongodb").WithId<import("bson").Document>[]>;
export declare const findDocumentById: (collection: Collection, id: string) => Promise<import("mongodb").WithId<import("bson").Document> | null>;
export declare const deleteDocumentById: (collection: Collection, id: string) => Promise<import("mongodb").DeleteResult>;
export declare const findDocumentsWithQuery: (collection: Collection, query?: any, projections?: any, options?: any) => Promise<import("mongodb").WithId<import("bson").Document>[]>;
export declare const useMongoAggregation: (collection: Collection, pipeline: any) => Promise<import("bson").Document[]>;