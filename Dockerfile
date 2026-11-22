# Build the static site with Quartz, then serve public/ with nginx.
# The dev server (`quartz build --serve`) watches files and runs a live-reload
# websocket; none of that is needed in production.

FROM node:24-slim AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx quartz build

# Non-root nginx that listens on 8080 (the port the Portainer stack maps).
FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/public /srv/www
EXPOSE 8080
