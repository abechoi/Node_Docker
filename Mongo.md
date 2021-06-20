<h1 align="center">
Mongo DB with Docker
</h1>

1. [Configuration](#configuration)
2. [Connection](#connection)
3. [Commands](#commands)

## Configuration

docker-compose.yaml

```
services:
  mongo:
    image: mongo
    # command: --serviceExecutor adaptive
    environment:
      - MONGO_INITDB_ROOT_USERNAME=dbadmin
      - MONGO_INITDB_ROOT_PASSWORD=dbpass
    volumes:
      - mongo-db:/data/db

volumes:
  mongo-db:
```

## Connection

Build and run containers

```
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```

Connect to Mongo DB

```
docker exec -it node_docker_mongo_1 mongo -u dbadmin -p dbpass
```

## Commands

Display all databases

```
show dbs
```

Activate database named mydb

```
use mydb
```

Insert entry into books

```
db.books.insert({ "title": "How to Change Your Mind" })
```

Display all entries in books

```
db.books.find()
```
