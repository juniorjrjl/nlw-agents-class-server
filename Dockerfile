FROM node:22.17.0

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH=/nlw-agents-class-server

RUN mkdir -p "$INSTALL_PATH"

WORKDIR $INSTALL_PATH

COPY package*.json .

RUN npm i

COPY . .