# Mongord -- Mongodb utility library

## Installation

`npm install @hushibul/mongord`
or
`yarn add @hushibul/mongord`

## Quick Start

This guide will show you how to set up a simple application using Node.js and MongoDB. Its scope is only how to set up the driver and perform the simple CRUD operations. For more in-depth coverage, see the official documentation.

### Create the **package.json** file

First, create a directory where your application will live.

`mkdir myProject
cd myProject`

Enter the following command and answer the questions to create the initial structure for your new project:

`npm init -y`

Next, install the driver as a dependency.

`npm install @hushibul/mongord`

### Setting Database configuration

`
import {setDbConfiguration} from '@hushibul/mongord';

setDbConfiguration(your_database_url, your_database_name, your_collection_name);
`

### Insert a Document

`import {insertDocument} from '@hushibul/mongord';
const insertedResult = await insertDocument({name: your_name});
console.log(insertedResult)`

### Insert Multiple Documents

`import {insertMultipleDocuments} from '@hushibul/mongord';
const insertedResult = await insertMultipleDocuments([{a: 6}, {b: 20}, c: 50]);
console.log(insertedResult);`

### Update a Document

`import {updateDocumentById} from '@hushibul/mongord;'
const updatedResult = await updateDocumentById(6669811da14e1b68a280245b, {a: 9});
console.log(updatedResult);
`

### Update Multiple Documents

`import {updateMultipleDocuments} from '@hushibul/mongord';
const updatedResult = await updateMultipleDocuments({a: 50});
console.log(updatedResult);`

### Find All Documents

`import {findAllDocuments} from '@hushibul/mongord';
const searchedResult = await findAllDocuments();
console.log(searchedResult);
`

### Find Documents with Pagination

`import {findDocumentsWithPagination} from '@hushibul/mongord';
const searchedResult = await findDocumentsWithPagination(skip_items, skip_limit);
console.log(searchedResult);`

### Search in the Documents

`import {searchInDocuments} from '@hushibul/mongord';
const searchedResult = await searchInDocuments(searched_input, the_field_you_want_to_search_in);
console.log(searchedResult);`

### Delete a Document

`import {deleteDocumentsById} from '@hushibul/mongord';
const deletedResult = await deleteDocumentsById(6669811da14e1b68a280245b);
console.log(deletedResult);`
