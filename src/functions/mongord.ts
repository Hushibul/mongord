import { Collection, MongoClient } from 'mongodb';
import {
  deleteDocumentById,
  findAll,
  findDocumentById,
  findDocumentsPagination,
  insertManyInDb,
  insertOneInDb,
  searchDocuments,
  updateManyDocuments,
  updateOneById,
  useMongoAggregation,
} from './operations';

let dbUrl: string;
let dbName: string;
let collectionName: string;

export const setDbConfiguration = (
  url: string,
  name: string,
  collection: string
) => {
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
export const insertDocument = async (insertData: any) => {
  try {
    return await withDbOperation((collection) =>
      insertOneInDb(collection, insertData)
    );
  } catch (error) {
    throw error;
  }
};

// Insert Many
export const insertMultipleDocuments = async (insertedData: any) => {
  try {
    return await withDbOperation((collection) =>
      insertManyInDb(collection, insertedData)
    );
  } catch (error) {
    throw error;
  }
};

// Update One By Id
export const updateDocumentById = async (id: string, updatedData: any) => {
  try {
    return await withDbOperation((collection) =>
      updateOneById(collection, id, updatedData)
    );
  } catch (error) {
    throw error;
  }
};

// Update Many
export const updateMultipleDocuments = async (query: any, updatedData: any) => {
  try {
    return await withDbOperation((collection) =>
      updateManyDocuments(collection, query, updatedData)
    );
  } catch (error) {
    throw error;
  }
};

// Find All Documents
export const findAllDocuments = async () => {
  try {
    return await withDbOperation((collection) => findAll(collection));
  } catch (error) {
    throw error;
  }
};

// Find Document By Id
export const findDocumentsById = async (id: string) => {
  try {
    return await withDbOperation((collection) =>
      findDocumentById(collection, id)
    );
  } catch (error) {
    throw error;
  }
};

// Search In Documents
export const searchInDocuments = async (
  searchInput: string,
  keyName: string
): Promise<any> => {
  try {
    return await withDbOperation((collection) =>
      searchDocuments(collection, searchInput, keyName)
    );
  } catch (error) {
    throw error;
  }
};

// Find Document With Pagination
export const findDocumentsWithPagination = async (
  skip: number,
  limit: number
) => {
  try {
    return await withDbOperation((collection) =>
      findDocumentsPagination(collection, skip, limit)
    );
  } catch (error) {
    throw error;
  }
};

// Use Mongodb Aggregation
export const useAggregation = async (pipeline: any) => {
  try {
    return await withDbOperation((collection) =>
      useMongoAggregation(collection, pipeline)
    );
  } catch (error) {
    throw error;
  }
};

// Delete Document By Id
export const deleteDocumentsById = async (id: string) => {
  try {
    return await withDbOperation((collection) =>
      deleteDocumentById(collection, id)
    );
  } catch (error) {
    throw error;
  }
};
