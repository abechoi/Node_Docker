<h1 align="center">
Redis with Docker
</h1>

1. [Configuration](#configuration)
2. [Connection](#connection)
3. [Commands](#commands)

## Configuration

docker-compose.yaml

```
services:
  redis:
    image: redis
```

## Connection

Build and run containers

```
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d -V
```

Connect to Redis via CLI

```
docker exec -it node_docker_redis_1 redis-cli
```

Connect to Redis via Node.js & Express

Install redis, connect-redis, express-session

```
npm install redis, connect-redis, express-session
```

Standard connection
index.js

```
const session = require("express-session");
const redis = require("redis");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);
```

## Store

Store req.session data

```
req.session.user = user;
```

## Commands

Display all keys

```
keys *
```

Display session data

```
get [SESSION ID]
```
