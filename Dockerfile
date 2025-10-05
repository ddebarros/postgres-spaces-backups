ARG NODE_VERSION='20.11.1'
ARG POSTGRES_VERSION=17

FROM node:${NODE_VERSION}-alpine AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM postgres:${POSTGRES_VERSION}-alpine

# Install Node.js in the PostgreSQL image
RUN apk add --update --no-cache nodejs npm

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

CMD ["sh", "-c", "pg_isready --dbname=$BACKUP_DATABASE_URL && pg_dump --version && node dist/index.js"]