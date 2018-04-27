#!/bin/bash

#Script inspired by https://codefresh.io/blog/debug_node_in_docker/

if [ $# -lt 1 ]; then
  printf "Please pass a container name as an argument:"
  docker ps
  exit 1
fi;

TARGET_CONTAINER=$1
TEMP_PORT=4848

#Remove any existing debug containers:
printf "Killing and removing any existing debug containers.\n"
docker kill socat-attach socat-fw > /dev/null
docker rm socat-attach socat-fw > /dev/null

printf "Changing node to debug mode.\n"
docker kill --signal=SIGUSR1 $TARGET_CONTAINER  > /dev/null

#Check if debugging with new or old debugger:
NODE_MAJ_VERSION=$(docker exec -it $TARGET_CONTAINER node --version | cut -c 2-2)
if [ ${NODE_MAJ_VERSION}  -lt 8 ]; then
  TARGET_PORT=5858
else
  TARGET_PORT=9229
fi

printf "Launching shared network interface and forwarding containers.\n"
docker run -d --name socat-attach --network=container:${TARGET_CONTAINER} socat socat TCP-LISTEN:${TEMP_PORT},fork TCP:127.0.0.1:${TARGET_PORT} > /dev/null

TARGET_IP=$(docker inspect -f "{{.NetworkSettings.IPAddress}}" ${TARGET_CONTAINER})

docker run -d -p ${TARGET_PORT}:${TARGET_PORT} --name socat-fw socat socat TCP-LISTEN:${TARGET_PORT},fork TCP:${TARGET_IP}:${TEMP_PORT} > /dev/null

printf "Ready for debugging on port ${TARGET_PORT}!\n"

if [ ${TARGET_PORT} -eq 9229 ]; then
  printf "Node 8.0 or higher, don't forget to connect with chromium inspector!\n"
fi
