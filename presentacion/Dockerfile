FROM node:18.14.2-alpine as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/presentacion /usr/share/nginx/html
COPY /server/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
