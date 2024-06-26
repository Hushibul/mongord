import { Collection } from 'mongodb';
import { DeleteTedType, InsertManyType, InsertOneType, UpdatedType } from '../types/types';
export declare const insertOneInDb: (collection: Collection, insertedData: any) => Promise<InsertOneType>;
export declare const insertManyInDb: (collection: Collection, insertedData: any) => Promise<InsertManyType>;
export declare const updateOneById: (collection: Collection, id: string, updateData: any) => Promise<UpdatedType>;
export declare const updateManyDocuments: (collection: Collection, updatedData: any, query?: {}) => Promise<UpdatedType>;
export declare const findAll: (collection: Collection, sortingOrder?: any) => Promise<any>;
export declare const findDocumentsPagination: (collection: Collection, limit?: number, skip?: number, sortingOrder?: any) => Promise<any>;
export declare const searchDocuments: (collection: Collection, searchedInput: string, keyName: string) => Promise<any>;
export declare const findDocumentById: (collection: Collection, id: string) => Promise<any>;
export declare const findDocumentsWithQuery: (collection: Collection, query?: any, projections?: any, options?: any) => Promise<any>;
export declare const useMongoAggregation: (collection: Collection, pipeline: any) => Promise<any>;
export declare const deleteDocumentById: (collection: Collection, id: string) => Promise<DeleteTedType>;
