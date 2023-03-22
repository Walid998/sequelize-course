# Sequalize Course

## Prerequisites

* NVM
* Docker

## Migrations Commands

```
npx sequelize db:create
npx sequelize migration:generate --name <migration-name>
npx sequelize db:migrate:status
npx sequelize db:migrate
npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
```