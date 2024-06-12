import { Collection } from 'mongodb';
export declare const setDbInfo: (url: string, name: string, collection: string) => void;
export declare const withDbOperation: (operation: (collection: Collection) => Promise<any>) => Promise<any>;
export declare const insertOne: (insertData: any) => Promise<any>;
export declare const insertMany: (insertedData: any) => Promise<any>;
export declare const findAll: () => Promise<any>;
