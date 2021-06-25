<h1 align="center">
Mongo DB with Docker
</h1>

1. [Configuration](#configuration)
2. [Connection](#connection)
3. [Commands](#commands)

## Configuration

SSH into production server and get docker and docker-compose

Ubuntu Linux

```
curl -fsSL https://get.docker.com -o get-docker.sh

sh get-docker.sh

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

.env

```
NODE_ENV=production
MONGO_USER=dbadmin
MONGO_PASSWORD=dbpass
SESSION_SECRET=secret
MONGO_INITDB_ROOT_USERNAME=dbadmin
MONGO_INITDB_ROOT_PASSWORD=dbpass
```

.profile

```
#add line to set all environment variables inside .env

set -o allexport; source /root/.env; set +o allexport;
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
