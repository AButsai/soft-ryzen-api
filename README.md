# SoftRyzen Backend (NestJS)

This is the backend for the SoftRyzen project, built using the NestJS framework.

## Table of Contents

1. [Building](#building)
2. [Required Versions](#required-versions)
3. [Database](#database)
4. [Environment variables](#environment-variables)
5. [Migrations data base](#migration)

## Building

To build the project, you can use the following command:

```bash
npm run build
npm run start
```

## Required Versions

Make sure you have the following versions of software installed:

```bash
node v18.17.1
npm v9.6.7
```

[Nodejs official website](https://nodejs.org/en)

## Database

This project uses PostgreSQL as its database. Make sure you have PostgreSQL installed and properly configured.

## Environment variables

Examples of environment variables are in: src/environment/.env.local.example

## Migration data base

```bash
npm run migrations:generate -- src/migrations/<name>
npm run migrations:create -- src/migrations/<name>
npm run migrations:run
npm run migrations:down
```
