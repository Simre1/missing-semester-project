#!/bin/bash

# Change 80 to the port where you want to serve the app 
docker run -d -p 80:3000 markdown-party:latest
