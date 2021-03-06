<h1 align="center">
Node.js & Express with Docker
</h1>

1. [Build](#build-docker-image)
2. [Ports](#ports)
3. [Volumes](#volumes)
4. [Compose](#compose)
5. [Database](#database)
6. [Network](#network)

## Build Docker Image

Build image in the current directory.

```
docker build -t node-app-image .
```

## Ports

local port = 4000
container port = 3000

```
docker run -p 4000:3000 -d --name node-app node-app-image
```

Set ports using --env-file.

```
docker run --env-file ./.env  -p 3000:4000 -d --name node-app node-app-image
```

## Volumes

Attach a volume from the current directory to the app directory in the container.
warning: this is bad practice because files created inside the container will be copied over to the local machine.

```
docker run -v $(pwd):/app -p 4000:3000 -d --name node-app node-app-image
```

Add :ro for read-only to prevent container from creating files.

```
docker run -v $(pwd):/app:ro -p 4000:3000 -d --name node-app node-app-image
```

Attach an anonymous volume to ensure node_modules is never deleted from the dev environment to production.

```
docker run -v $(pwd):/app:ro -v /app/node_modules -p 4000:3000 -d --name node-app node-app-image
```

Remove all inactive volumes

```
docker volume prune
```

Remove container with associated volume

```
docker rm -fv node-app
```

## Compose

To build and run containers with a pre-configured file:

1. Create a docker-compose.yaml
2. Run up command

```
docker-compose up -d
# to force a new build
docker-compose up -d --build
```

3. Run down command

```
docker-compose down -v
```

docker-compose can be configured to build different environments with different dependencies.

Example: In package.json, by placing nodemon inside devDependencies, a NODE_ENV that is not equal to development, will not download it upon executing npm install.

To change configs for development and production:

1. Create docker-compose.dev.yaml and docker-compose.prod.yaml.
2. Overwrite docker-compose.yaml using if statement in Dockerfile.

Run dev

```
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build
```

Run prod

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```

Shutdown prod

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml down -v
```

## Database

See Mongo.md for more details.

## Network

list docker networks

```
docker network ls
```

inspect docket network

```
docker network inspect node_docker_default
```
