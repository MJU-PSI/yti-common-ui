# alpine version should match the version in .nvmrc as closely as possible
FROM node:14.18-alpine3.15

# set working directory
WORKDIR /app

# Install and cache app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# Copy sources
COPY projects/ projects/
COPY angular.json .
COPY tsconfig.json .


# Build the dist dir containing the static files
RUN yarn run build:prod
