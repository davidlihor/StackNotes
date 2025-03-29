FROM node:18-alpine AS builder
WORKDIR /app

COPY FRONTEND/package*.json ./
RUN npm install

COPY FRONTEND ./
RUN npm run build


FROM nginx:alpine
RUN addgroup --system --gid 1001 nginxgroup
RUN adduser --system --uid 1001 nginxuser

COPY --from=builder --chown=nginxuser:nginxgroup /app/dist /usr/share/nginx/html
COPY FRONTEND/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/run /var/cache/nginx && chown nginxuser:nginxgroup /var/run /var/cache/nginx

COPY FRONTEND/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

USER nginxuser
EXPOSE 80