# **Test task for Speed&Function company.**

## Setup database

Database for the project is containerized with Docker.
Credentials are `user:password`.
After successful build you will get MySQL 8.0 + phpMyAdmin that accessible at http://localhost:8080.

To build the container, run:

```
docker-compose up -d
```

## Setup Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

URL: http://localhost:3001

## Setup Backend

1. NPM init: `npm install`.
2. Database migration: `npx sequelize-cli db:migrate`.
3. Database seeder: `npx sequelize-cli db:seed:all` will import table with data from `files/earthqaukes1970-2014.csv` file.
4. Run `npx ts-node src/index.ts`.
