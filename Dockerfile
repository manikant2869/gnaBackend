# syntax=docker/dockerfile:1
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm install -g pm2

CMD ["pm2-runtime", "index.js"]