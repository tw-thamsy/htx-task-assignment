# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ ./
COPY shared/ /app/shared/
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY build/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
