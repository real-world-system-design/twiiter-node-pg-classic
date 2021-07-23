<h1 align="center">:dolphin:<tt>Hue</tt>:dolphin:</h1>
<blockquote align="center">Backend API for a social media application like twitter</blockquote>

<p align="center"><a href="https://github.com/real-world-system-design/twiiter_node_pg"><img alt="Github actions status" src="https://github.com/real-world-system-design/twiiter_node_pg/actions/workflows/build.yaml/badge.svg" /></a></p>

## Technologies used :
* NodeJS     -- Platform
* Express    -- Server
* TypeScript -- Language
* PostgreSQL -- DataBase
* TypeORM    -- ORM
* Bcrypt     -- Hashing
* Jwt        -- Autheentication
* Redis      -- Cache
* Heroku     -- Deployment

## Database setup

```$ sudo -i -u postgres```

1. Enter `psql` as admin .

```$ psql```

2. Create database user and grant all privileges

```SQL
 $create database twitter;

 $create user twitter with encrypted password 'twitter';

 `swith to the newly created db and grant all privileges to the user`

 $grant all privileges on database twitter to twitter;

```

## Installation

```bash
$ npm install
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
