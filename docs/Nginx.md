<h1 align="center">
Nginx with Docker
</h1>

1. [Configuration](#configuration)
2. [Connection](#connection)
3. [Commands](#commands)

## Configuration

default.conf

```
server {
  listen 80;

  location /api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://node-app:3000;
    proxy_redirect off;
  }
}
```

docker-compose.yaml

```
services:
  nginx:
    image: nginx:stable-alpine
```

docker-compose.dev.yaml

```
services:
  nginx:
    ports:
      - "3000:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
```

docker-compose.prod.yaml

```
services:
  nginx:
    ports:
      - "80:80"
```

## Connection

Build and run containers

```
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
```

Connect to Mongo DB via CLI

```
docker exec -it node_docker_mongo_1 mongo -u dbadmin -p dbpass
```

Connect to Mongo DB via Node.js & Express

Install mongoose

```
npm install mongoose
```

Standard connection
index.js

```
# URI = "mongodb://[DB_USERNAME]:[DB_PASSWORD]@[HOST]:[PORT]/?authSource=admin"
mongoose
  .connect("mongodb://dbadmin:dbpass@mongo:27017/?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Successfully connected to Mongo DB..."))
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("<h1>Hello, World!</h1>");
});
```

Loop Connection
index.js

```
const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Successfully connected to Mongo DB..."))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 2000);
    });
};

connectWithRetry();
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
