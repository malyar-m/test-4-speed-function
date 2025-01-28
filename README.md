Test task for Speed&Function company.


http://localhost:8080/ - phpmyadmin

## Setup

Build docker database php admin containers:

```
docker-compose up -d
```

Run migrations

```
npx sequelize-cli db:migrate
```

Seed the `earthquakes` table with data from `files/earthquakes1970-2014.csv`

```
 npx sequelize-cli db:seed:all
```
