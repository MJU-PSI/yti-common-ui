#!/bin/bash
./gradlew npmBuild
docker build -t yti-common-ui:latest .
