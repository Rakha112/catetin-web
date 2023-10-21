# 1. For build React app
FROM node:alpine as build

# Set working directory
WORKDIR /app

# Copy all package.json
COPY package*.json ./

# Same as npm install
RUN npm install

COPY . .

ARG REACT_APP_API

ENV REACT_APP_API=$REACT_APP_API

RUN npm run build

# # 2. Copy only the build folder
FROM node:alpine as final

WORKDIR /app

COPY --from=build /app/build /app/build