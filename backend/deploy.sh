#!/usr/bin/env bash
docker-compose -p sample-chat-swarm build --no-cache
docker-compose -p sample-chat-swarm push
docker stack deploy --compose-file docker-compose.yaml sample-chat-swarm