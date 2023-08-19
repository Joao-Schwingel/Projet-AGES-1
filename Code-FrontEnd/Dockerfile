FROM node:18-alpine3.16 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY public public
COPY src src
COPY .eslintrc.json .prettierrc tsconfig.json ./
RUN npm run build

FROM nginx:1.23.4-alpine3.17 as runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
