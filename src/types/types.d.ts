import { ObjectId } from 'mongodb';

interface InsertOneType {
  acknowledged: boolean;
  insertedId: ObjectId;
}

interface InsertManyType {
  acknowledged: boolean;
  insertedIds: {
    [key: string]: ObjectId;
  };
}

interface UpdatedType {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
}

interface DeleteTedType {
  acknowledged: boolean;
  deletedCount: number;
}
