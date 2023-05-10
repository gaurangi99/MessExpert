#!/bin/bash

# Copy the new jar to the build location
cp -f ./poll/target/*.jar jenkins/build/

echo "****************************"
echo "** Building Backend  Image ***"
echo "****************************"

cd jenkins/build/ && docker-compose -f docker-compose-build.yml build --no-cache


echo "****************************"
echo "** Building Frontend Image ***"
echo "****************************"
cd ../../
pwd
cd Frontend && docker-compose -f docker-compose.yml build --no-cache
