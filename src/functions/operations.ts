import { Collection, ObjectId } from 'mongodb';
import {
  DeleteTedType,
  InsertManyType,
  InsertOneType,
  UpdatedType,
} from '../types/types';

// INSERT ONE DOCUMENT
export const insertOneInDb = async (
  collection: Collection,
  insertedData: any
): Promise<InsertOneType> => {
  try {
    return await collection.insertOne(insertedData);
  } catch (error) {
    throw error;
  }
};

// INSERT MULTIPLE DOCUMENT
export const insertManyInDb = async (
  collection: Collection,
  insertedData: any
): Promise<InsertManyType> => {
  try {
    return await collection.insertMany(insertedData);
  } catch (error) {
    throw error;
  }
};

// UPDATE ONE DOCUMENT
export const updateOneById = async (
  collection: Collection,
  id: string,
  updateData: any
): Promise<UpdatedType> => {
  try {
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  } catch (error) {
    throw error;
  }
};

//UPDATE MULTIPLE DOCUMENTS
export const updateManyDocuments = async (
  collection: Collection,
  updatedData: any,
  query = {}
): Promise<UpdatedType> => {
  try {
    return await collection.updateMany(query, { $set: updatedData });
  } catch (error) {
    throw error;
  }
};

// FIND ALL DOCUMENTS
export const findAll = async (
  collection: Collection,
  sortingOrder?: any
): Promise<any> => {
  try {
    return await collection.find({}).sort(sortingOrder).toArray();
  } catch (error) {
    throw error;
  }
};

// FIND DOCUMENTS WITH PAGINATION
export const findDocumentsPagination = async (
  collection: Collection,
  limit = 10,
  skip = 0,
  sortingOrder?: any
): Promise<any> => {
  const options = {
    limit: limit,
    skip: skip,
  };
  try {
    return await collection.find({}, options).sort(sortingOrder).toArray();
  } catch (error) {
    throw error;
  }
};

export const searchDocuments = async (
  collection: Collection,
  searchedInput: string,
  keyName: string
): Promise<any> => {
  const query = {
    [keyName]: { $regex: searchedInput, $options: 'i' },
  };
  try {
    return await collection.find(query).toArray();
  } catch (error) {
    throw error;
  }
};

// FIND DOCUMENT BY ID
export const findDocumentById = async (
  collection: Collection,
  id: string
): Promise<any> => {
  try {
    return await collection.findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw error;
  }
};

// FIND DOCUMENTS
export const findDocumentsWithQuery = async (
  collection: Collection,
  query?: any,
  projections?: any,
  options?: any
): Promise<any> => {
  try {
    // Merge projections into options if projections are provided
    if (projections) {
      options = { ...options, projection: projections };
    }

    return await collection.find(query, options).toArray();
  } catch (error) {
    throw error;
  }
};

// USE MONGO AGGREGATION
export const useMongoAggregation = async (
  collection: Collection,
  pipeline: any
): Promise<any> => {
  try {
    return await collection.aggregate(pipeline).toArray();
  } catch (error) {
    throw error;
  }
};

// DELETE DOCUMENT BY ID
export const deleteDocumentById = async (
  collection: Collection,
  id: string
): Promise<DeleteTedType> => {
  return await collection.deleteOne({ _id: new ObjectId(id) });
};
