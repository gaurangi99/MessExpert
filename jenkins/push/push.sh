#!/bin/bash

echo "********************"
echo "** Pushing image ***"
echo "********************"

#IMAGE="spe-mini-project"

echo "** Logging in ***"
echo $PASS | docker login -u $USER --password-stdin
echo "*** Tagging image backend***"
docker tag $IMAGE_BE:v3 $USER/$IMAGE_BE:v3
echo "*** Pushing image backend***"
docker push $USER/$IMAGE_BE:v3
docker rmi  $IMAGE_BE:v3
docker rmi  $USER/$IMAGE_BE:v3

echo "*** Tagging image Frontend***"
docker tag $IMAGE_FE:v3 $USER/$IMAGE_FE:v3
echo "*** Pushing image Frontend***"
docker push $USER/$IMAGE_FE:v3
docker rmi  $IMAGE_FE:v3
docker rmi  $USER/$IMAGE_FE:v3

