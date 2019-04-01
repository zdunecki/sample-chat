#!/bin/sh
printf "STARTING MIGRATIONS AND API "

sleep 30 #TODO: wait for mysql

./node_modules/.bin/knex migrate:latest --knexfile ./src/db/config.js
node app.js
