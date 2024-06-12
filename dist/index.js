import { MongoClient } from 'mongodb';

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
// FIND ALL DOCUMENTS
const findAllDocuments = (collection, sortingOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield collection.find({}).sort(sortingOrder).toArray();
    }
    catch (error) {
        throw error;
    }
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
const insertOne = (insertData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => insertOneInDb(collection, insertData));
    }
    catch (error) {
        throw error;
    }
});
// Insert Many
const insertMany = (insertedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => insertManyInDb(collection, insertedData));
    }
    catch (error) {
        throw error;
    }
});
// Find All Documents
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield withDbOperation((collection) => findAllDocuments(collection));
    }
    catch (error) {
        throw error;
    }
});

export { findAll, insertMany, insertOne, setDbInfo, withDbOperation };
