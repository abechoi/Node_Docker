<h1 align="center">
Deploying for Production
</h1>

## Configuration 1

<p align="center">
The workflow of this production configuration starts from git pull, docker-compose up --build, build image, and rebuild container. The downside to this configuation is that it is CPU intense to rebuild for every change.
</p>

## Configuration 2

<p align="center">
The workflow of this production configuration starts from git pull, docker-compose up --build, build image, and rebuild container. The downside to this configuation is that it is CPU intense to rebuild for every change.
</p>

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

3. Get Git repo.

```
git clone https://github.com/abechoi/Node_Docker
```

4. Use docker compose to build and run.

```
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
```

```
# build node-app without dependencies
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build --no-deps node-app
```
