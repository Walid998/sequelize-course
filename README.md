# Sequalize Course

## Prerequisites

* NVM
* Docker

## Run The Application
```
docker-compose up -d // -d or --detach runs docker in the background
```
## Migrations Commands

```
npx sequelize db:create
npx sequelize migration:generate --name <migration-name>
npx sequelize db:migrate:status
npx sequelize db:migrate
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
```