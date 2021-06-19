<h1 align="center">
Node.js & Express with Docker
</h1>

1. [Build](#build-docker-image)
2. [Ports](#ports)
3. [Volumes](#volumes)

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
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env  -p 3000:4000 -d --name node-app node-app-image
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
