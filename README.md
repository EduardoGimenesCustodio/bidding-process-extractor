## Description

This API automatically extracts bidding processes from the [public procurement portal](https://www.portaldecompraspublicas.com.br/processos), in addition to allowing specific extractions. Stored bidding processes are updated in case of modifications and can be listed, edited and/or deleted.

## Installation

```bash
$ npm install
```

## Preparing the database

```bash
# run existing migrations
$ npm run typeorm:run-migrations

# generate new migrations after changes in database models
$ npm run typeorm:generate-migration
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API documentation

The Bidding Process Extractor API description can be accessed via the [/api](http://localhost:3000/api) route.
