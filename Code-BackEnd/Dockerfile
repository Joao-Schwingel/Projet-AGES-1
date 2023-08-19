FROM node:18-alpine3.16 AS builder

ARG DATABASE_URL

WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm i -g @nestjs/cli

COPY tsconfig.json /app
COPY prisma /app/prisma
COPY package.json /app

RUN npm install

COPY . /app

# Build the app
RUN npm run build
RUN npx prisma generate

WORKDIR /app
EXPOSE 3001
CMD [ "ash", "-c", "npm run migrate && npm run seed && npm run start" ]