<h1 align="center">
Deploying for Production
</h1>

1. [Server Setup](#server-setup)
2. [Configuration 1](#configuration-1)
3. [Configuration 2](#configuration-2)
4. [Docker Swarm](#docker-swarm)

## Server Setup

1. SSH into production server and get docker and docker-compose.

note: Ensure port 22 and 80 are opened.

Ubuntu Linux

```
curl -fsSL https://get.docker.com -o get-docker.sh

sh get-docker.sh

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

2. Create a .env and .profile.

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

## Configuration 1

<p align="center">
The workflow of this production configuration starts from build image, push to dockerhub, pull from dockerhub, to rebuild.
</p>

1. Create Dockerhub repo.

2. Build and push the image.

```
# initial
docker image tag node_docker_node-app abechoi/node-app

docker push abechoi/node-app
```

```
# after initial
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml build node-app

docker compose -f docker-compose.yaml -f docker-compose.prod.yaml push node-app
```

3. Configure docker-compose.yaml

```
services:
  node-app:
    build: .
    image: abechoi/node-app
```

4. Pull from Dockerhub.

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml pull node-app

docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --no-deps node-app
```

5. Pull from Dockerhub automatically.

```
# run watchtower and check image every 50 seconds
docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower app_node-app_1

```

## Configuration 2

<p align="center">
The workflow of this production configuration starts from git pull, docker-compose up --build, build image, and rebuild container. The downside to this configuation is that it is CPU intense to rebuild for every change.
</p>

1. Get Git repo.

```
git clone https://github.com/abechoi/Node_Docker
```

2. Use docker compose to build and run.

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
```

```
# build node-app without dependencies
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build --no-deps node-app
```

## Docker Swarm

1. Set IP Address for Docker swarm.

```
docker swarm init --advertise-addr 143.198.59.179
```

2. Reconfigure docker-compose.prod.yaml.

```
services:
  node-app:
    deploy:
      replicas: 2
      restart_policy:
        condition: any
      update_config:
        parallelism: 2
        delay: 15s
```

3. Build and run swarm

```
docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml my-app
```

4. Rebuild and push.

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build node-app

docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml push node-app
```

5. Pull and run on server.

```
docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml myapp
```
