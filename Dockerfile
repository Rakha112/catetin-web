# 1. For build React app
FROM node:alpine AS development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Same as npm install
RUN npm install

COPY . /app

ARG REACT_APP_API

ENV REACT_APP_API=$REACT_APP_API

RUN npm run build