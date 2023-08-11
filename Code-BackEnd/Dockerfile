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

FROM node:18-alpine3.16

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/prisma ./

RUN npx prisma generate
WORKDIR /app
EXPOSE 3001

