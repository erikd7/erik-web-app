#!/bin/bash

#start the servers
echo 'Starting the Vue server and Python server'
python api-server/app.py & npm run server
