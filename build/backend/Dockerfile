# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json* ./
RUN npm ci

COPY backend/ ./
COPY shared/ /app/shared/
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=build /app/backend/dist ./dist

EXPOSE 3000
CMD ["node", "dist/backend/src/main.js"]
