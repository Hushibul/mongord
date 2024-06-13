import { ObjectId, MongoClient } from 'mongodb';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// INSERT ONE DOCUMENT
const insertOneInDb = (collection, insertedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.insertOne(insertedData);
    }
    catch (error) {
        throw error;
    }
});
// INSERT MULTIPLE DOCUMENT
const insertManyInDb = (collection, insertedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.insertMany(insertedData);
    }
    catch (error) {
        throw error;
    }
});
// UPDATE ONE DOCUMENT
const updateOneById = (collection, id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    }
    catch (error) {
        throw error;
    }
});
//UPDATE MULTIPLE DOCUMENTS
const updateManyDocuments = (collection_1, updatedData_1, ...args_1) => __awaiter(void 0, [collection_1, updatedData_1, ...args_1], void 0, function* (collection, updatedData, query = {}) {
    try {
        return yield collection.updateMany(query, { $set: updatedData });
    }
    catch (error) {
        throw error;
    }
});
// FIND ALL DOCUMENTS
const findAll = (collection, sortingOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.find({}).sort(sortingOrder).toArray();
    }
    catch (error) {
        throw error;
    }
});
// FIND DOCUMENTS WITH PAGINATION
const findDocumentsPagination = (collection_2, ...args_2) => __awaiter(void 0, [collection_2, ...args_2], void 0, function* (collection, limit = 10, skip = 0, sortingOrder) {
    const options = {
        limit: limit,
        skip: skip,
    };
    try {
        return yield collection.find({}, options).sort(sortingOrder).toArray();
    }
    catch (error) {
        throw error;
    }
});
const searchDocuments = (collection, searchedInput, keyName) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        [keyName]: { $regex: searchedInput, $options: 'i' },
    };
    try {
        return yield collection.find(query).toArray();
    }
    catch (error) {
        throw error;
    }
});
// FIND DOCUMENT BY ID
const findDocumentById = (collection, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.findOne({ _id: new ObjectId(id) });
    }
    catch (error) {
        throw error;
    }
});
// USE MONGO AGGREGATION
const useMongoAggregation = (collection, pipeline) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.aggregate(pipeline).toArray();
    }
    catch (error) {
        throw error;
    }
});
// DELETE DOCUMENT BY ID
const deleteDocumentById = (collection, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield collection.deleteOne({ _id: new ObjectId(id) });
});

let dbUrl;
let dbName;
let collectionName;
const setDbInfo = (url, name, collection) => {
    dbUrl = url;
    dbName = name;
    collectionName = collection;
};
const withDbOperation = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    const dbConnection = new MongoClient(dbUrl);
    try {
        yield dbConnection.connect();
        const db = dbConnection.db(dbName);
        const collection = db.collection(collectionName);
        return yield operation(collection);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error(String(error));
        }
    }
    finally {
        yield dbConnection.close();
    }
});
// Insert One
const insertDocument = (insertData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => insertOneInDb(collection, insertData));
    }
    catch (error) {
        throw error;
    }
});
// Insert Many
const insertMultipleDocuments = (insertedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => insertManyInDb(collection, insertedData));
    }
    catch (error) {
        throw error;
    }
});
// Update One By Id
const updateDocumentById = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => updateOneById(collection, id, updatedData));
    }
    catch (error) {
        throw error;
    }
});
// Update Many
const updateMultipleDocuments = (query, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => updateManyDocuments(collection, query, updatedData));
    }
    catch (error) {
        throw error;
    }
});
// Find All Documents
const findAllDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => findAll(collection));
    }
    catch (error) {
        throw error;
    }
});
// Find Document By Id
const findDocumentsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => findDocumentById(collection, id));
    }
    catch (error) {
        throw error;
    }
});
// Search In Documents
const searchInDocuments = (searchInput, keyName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => searchDocuments(collection, searchInput, keyName));
    }
    catch (error) {
        throw error;
    }
});
// Find Document With Pagination
const findDocumentsWithPagination = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => findDocumentsPagination(collection, skip, limit));
    }
    catch (error) {
        throw error;
    }
});
// Use Mongodb Aggregation
const useAggregation = (pipeline) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => useMongoAggregation(collection, pipeline));
    }
    catch (error) {
        throw error;
    }
});
// Delete Document By Id
const deleteDocumentsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => deleteDocumentById(collection, id));
    }
    catch (error) {
        throw error;
    }
});

export { deleteDocumentsById, findAllDocuments, findDocumentsById, findDocumentsWithPagination, insertDocument, insertMultipleDocuments, searchInDocuments, setDbInfo, updateDocumentById, updateMultipleDocuments, useAggregation, withDbOperation };
