import { Collection, MongoClient } from 'mongodb';
import { findAllDocuments, insertManyInDb, insertOneInDb } from './operations';

let dbUrl: string;
let dbName: string;
let collectionName: string;

export const setDbInfo = (url: string, name: string, collection: string) => {
  dbUrl = url;
  dbName = name;
  collectionName = collection;
};

export const withDbOperation = async (
  operation: (collection: Collection) => Promise<any>
): Promise<any> => {
  const dbConnection = new MongoClient(dbUrl);
  try {
    await dbConnection.connect();
    const db = dbConnection.db(dbName);
    const collection = db.collection(collectionName);

    return await operation(collection);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  } finally {
    await dbConnection.close();
  }
};

// Insert One
export const insertOne = async (insertData: any) => {
  try {
    return await withDbOperation((collection) =>
      insertOneInDb(collection, insertData)
    );
  } catch (error) {
    throw error;
  }
};

// Insert Many
export const insertMany = async (insertedData: any) => {
  try {
    return await withDbOperation((collection) =>
      insertManyInDb(collection, insertedData)
    );
  } catch (error) {
    throw error;
  }
};

// Find All Documents
export const findAll = async () => {
  try {
    return await withDbOperation((collection) => findAllDocuments(collection));
  } catch (error) {
    throw error;
  }
};
