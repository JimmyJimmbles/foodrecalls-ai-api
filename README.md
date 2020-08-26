# FoodRecalls.ai API

The backend API for [FoodRecalls.ai](https://foodrecalls.ai/)

## Table of Contents

- [Development](#development)
  - [Install Prerequisites](#install-prerequisites)
  - [Starting the API](#starting-the-api)
  - [GraphQL Playground](#graphql-playground)
  - [Builds](#builds)
  - [Architecture](#architecture)
    - [Dataloaders](#dataloaders)
    - [GraphQL Types](#graphql-types)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Monitoring](#monitoring)
  - [Logging](#logging)
  - [Error Handling](#error-handling)
  - [Request Tracing](#request-tracing)

## Development

This is a standard [GraphQL][graphql] [Node.js][nodejs] API built on top of the
[Express][express] and [Apollo Server][apollo-server] frameworks and the
[Sequelize][sequelize] database framework.

### Install Prerequisites

The only prerequisites that you will absolutely need to install is
[Node.js][nodejs].

### Starting the API

The first step will be to [configure](#configuration) the API.

### GraphQL Playground

Assuming that the playground is enabled in the
[configuration](#api_enable_playground), you should be able to access
the GraphQL playground on the `/graphql` path. This should be available at
http://localhost:5000/graphql. The playground allows you to browse the GraphQL
schema and build/execute requests in order to quickly develop against the new
API. You can think of it as a Postman specially tailored for GraphQL.

### Builds

Builds for this project can be executed through NPM.

```sh
# Execute via npm
npm run build

# Start server
npm start
```

### Architecture

This application follows a fairly simple layout underneath the [`src`](src)
directory with top-level application code at the root and the GraphQL modules
nested in the [`modules`](src/modules) subdirectory.

#### Data Models

In order to simplify creating the base data models, this application take advantage
of the [Sequelize][sequelize] cli. This makes it easier to generate data models as well
as seeders, and migrations.

```sh
# Create model, you must provide initial attributes
sequelize-cli model:generate --name users --attributes id:ID

# Crate migrations
sequelize-cli migration:generate --name create_users_table

# Create seeders
sequelize-cli seed:generate --name demo-user

# Run seeder
sequelize-cli db:seed:all

# Run migrate
sequelize-cli db:migrate
```

#### Dataloaders

In order to simplify the common model querying patterns in an efficient way,
this application takes advantage of the [DataLoader][dataloader] library. The
standard setup re-initializes each of the dataloaders for each request so that
the caching behavior can be used, but does not bleed across requests. Several
custom dataloaders are provided in [the `dataloaders` folder](src/dataloaders)
and can be reused for different models.

##### Model by Field

The [`modelByField`
dataloader](src/dataloaders/modelByField.js) is used to query for a single
model by a single field. This is generally used to lookup a model by a unique
key. The [`modelById` dataloader](#model-by-id) is recommended when wanting to
query based on the `id` field as a special case.

The dataloader takes the model and the field to query by at initialization, and
then for the `load` calls it just takes a single value to query for.

```js
// Initialize the dataloader
const userByEmail = modelByField(User, 'email');

// Fetch a single record
const myUser = await userByEmail.load('jay.jones@wlion.com');
```

##### Model by ID

The [`modelById` dataloader](src/dataloaders/modelById.js) is used to query for
a single model by its id. It is a special case of the generic [`modelByField`
dataloader](#model-by-field) used to simplify this common use case.

The dataloader takes the model to query by at initialization, and then for the
`load` calls it just takes a single id to query for.

```js
// Initialize the dataloader
const userById = modelById(User);

// Fetch a single record
const myUser = await userById(1234);
```

##### Collection by Query

The [`collectionByQuery` dataloader](src/dataloaders/collectionByQuery.js) is
used to query for all matching models matching a fairly customizable query.

The dataloader takes the model to query on at initialization, and then for the
`load` calls it takes query parameters that references the `query`
(any of the standard Sequelize query parameters can be specified here, but
don't include the main foreign key being searched on), and a
`valueField`/`value` pair that are used to query by foreign key.

```js
// Initialize the dataloader
const productsByQuery = collectionByQuery(Product);

// Fetch all products for a category making sure to order the collection
const myProducts = await productsByQuery.load({
  query: { order: [['title', 'ASC']] },
  value: '1234',
  valueField: 'categoryId',
});

// Same as above, but only fetch the stocked products
const myProducts = await productsByQuery.load({
  query: { order: [['title', 'ASC']], where: { isStocked: true } },
  value: '1234',
  valueField: 'categoryId',
});
```

##### Paginated Collection

The [`paginatedCollection` dataloader](src/dataloaders/paginatedCollection.js)
is used to query for paginated results of a full list of models. It is not a
"true" dataloader in that it will not support caching at all, but its use case
doesn't require caching.

The dataloader takes the model to query on at initialization, and then for the
`load` calls it takes pagination arguments that includes the `sortBy` (what
model field to sort by), the `sortDirection` (either `ASC` or `DESC`), the
`offset`, and the `limit`. It will return a results object that includes the
list of `records` for the requested page and the `count` of total records for
the collection.

```js
// Initialize the dataloader
const allProducts = paginatedCollection(Product);

// Fetch the first page of 100 products
const myProducts = await allProducts.load({
  sortBy: 'title',
  sortDirection: 'ASC',
  offset: 0,
  limit: 100,
});
```

#### GraphQL Types

There are several custom GraphQL scalar types that are defined by the
application in order to improve validation and data integrity. These will
throw errors if incorrect values are passed in from the client and ensure that
the GraphQL mutations only receive valid arguments.

##### Count

A `Count` type can either be a string or a number, but will be coerced to a
valid number. Any floating point, negative numbers, or numbers greater than
`MAX_SAFE_INTEGER` will be rejected. A `Count` type is meant to be used
anywhere a positive whole number is expected and will be kept as an integer
when used.

##### NonemptyString

The `NonemptyString` type is used when a string argument is expected but
should not be empty. If the GraphQL schema allows the field to be `null`, then
`null` values will still be allowed, but if a value is provided then it is
required to be a string with data in it. In addition, the value is trimmed of
any whitespace to ensure that there are no confusing leading/trailing spaces
and that values like `" "` are not allowed.

##### Uuid

The `Uuid` type is used to represent valid [RFC 4122 UUIDs][rfc-4122].

## Configuration

The ultimate source of configuration for this application is
[environment variables](#environment-variables). They can be provided from a
variety of sources.

### Environment Variables

This is a list of supported environment variables and a brief description of
what they do. Not all of these environment variables are required, but they
can be used to customize behavior of the application.

#### `API_ENV`

The current server environment.

#### `API_CORS_ALLOWED_ORIGINS`

A comma-delimited list of allowed origins to access the API using
[CORS][cors]. If not specified, CORS will be disabled and API requests will be
denied to cross-origin browser requests.

#### `API_PORT`

Port run the API on (ex: `5000`).

#### `API_ENABLE_INTROSPECTION`

Set to the string `true` in order to enable GraphQL schema introspection. This
should be enabled for development as it enables the schema exploration in the
GraphQL Playground. This should be disabled in production.

#### `API_ENABLE_PLAYGROUND`

Set to the string `true` in order to enable the interactive GraphQL
playground. This should be enabled for development as it is helpful to use
when trying out API requests. This should be disabled in production.

#### `API_ENABLE_TRACING`

Set to the string `true` in order to enable tracing data to be returned in the
GraphQL responses. This should be disabled in production.

#### `API_RETURN_ERRORS`

Set to the string `true` in order to enable all GraphQL errors to be returned
to the client. On production, this should be left disabled in order to prevent
leaking of sensitive information to the client, but on development
environments enabling this feature will make it easier to discover errors.

#### `LOG_COLORS`

Set to the string `true` in order to enable colorful logs. This is nice for
local development where the logs are printed to a console and the colors can
help draw attention where it is needed. In production, this should be left
disabled for better logging to cloud services like AWS CloudWatch.

#### `LOG_LEVEL`

This controls the amount of data that is logged. The available levels for
logging are [described below](#logging) and the default level if none is set
is `info`. For local development, it may be desirable to increase the amount
of logging in order to easily debug issues.

## API Endpoints

GraphQL does a good job of describing the API. Take a look at the schema in the
playground to see more.

## Monitoring

This API facilitates monitoring via logging and request tracing.

### Logging

This API uses [winston][winston] for logging. This enables the application to
log at custom error levels and include objects in the log for more
information.

### Error Handling

Apollo Server provides automatic error handling with hooks that this
application uses to prevent leaking details. For any unexpected errors, the
best course of action is to let the error bubble up to the global handler
which will log the error but only report an unknown error to the user unless
the [`API_RETURN_ERRORS`](#api_return_errors) configuration is enabled.

For returning useful errors to the user, use the internal `UserSafeError`.
That error, or any subclass of it, will be returned to the user as-is. These
errors will also only be logged at the `warn` level instead of the `error`
level since they are problems with other applications or user input, and not
internal problems of the API.

### Request Tracing

All logs for API requests will include several request ids in order to
facilitate tracing log messages across each individual API request and
matching those requests to requests made to other systems as well. Every
single request will be assigned a randomly-generated `requestId`.

If an API request includes an `X-Parent-Request-Id` header, it will be logged
as the `parentRequestId`. That header is expected to be set by the parent
application to its own internal `requestId` that signifies a single request, if
there is one. By being able to trace back through logs and other auditing
systems it should be possible to better diagnose issues in requests.

Finally, if an API request includes an `X-Base-Request-Id` header, it will be
logged as the `baseRequestId`. If that header is not set but the
`parentRequestId` is set then the `baseRequestId` will be assumed to be the
same request, and if that isn't set either, then `baseRequestId` will be set to
the current `requestId`. This request id is used to identify the originating
request across all compliant systems without having to trace through the parent
links.

[apollo-server]: https://www.apollographql.com/docs/apollo-server/
[cors]: https://www.w3.org/TR/cors/
[dataloader]: https://github.com/facebook/dataloader
[express]: http://expressjs.com/
[graphql]: https://graphql.org/
[nodejs]: https://nodejs.org/
[sequelize]: https://sequelize.org/
[winston]: https://github.com/winstonjs/winston
