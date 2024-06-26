import { Collection } from 'mongodb';
export declare const setDbConfiguration: (url: string, name: string, collection: string) => void;
export declare const withDbOperation: (operation: (collection: Collection) => Promise<any>) => Promise<any>;
export declare const insertDocument: (insertData: any) => Promise<any>;
export declare const insertMultipleDocuments: (insertedData: any) => Promise<any>;
export declare const updateDocumentById: (id: string, updatedData: any) => Promise<any>;
export declare const updateMultipleDocuments: (query: any, updatedData: any) => Promise<any>;
export declare const findAllDocuments: () => Promise<any>;
export declare const findDocumentsById: (id: string) => Promise<any>;
export declare const searchInDocuments: (searchInput: string, keyName: string) => Promise<any>;
export declare const findDocumentsWithPagination: (skip: number, limit: number) => Promise<any>;
export declare const useAggregation: (pipeline: any) => Promise<any>;
export declare const deleteDocumentsById: (id: string) => Promise<any>;
