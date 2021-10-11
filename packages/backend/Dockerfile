FROM node:lts-alpine as config
WORKDIR /app
USER node
COPY package.json tsconfig.json yarn.lock ./
COPY ./packages/backend/package*.json \
    ./packages/backend/tsconfig*.json \
    ./packages/backend/
    
FROM node:lts-alpine as development
ARG DATABASE
ARG DB_HOST
ARG USER
ARG PASSWORD
ENV NODE_ENV development
RUN mkdir -p /app/dist
WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node --from=config /app .
RUN yarn install
EXPOSE 3000
CMD yarn backend:dev

FROM node:lts-alpine as testing
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY ./packages/backend/package.json ./packages/backend/
CMD yarn backend:test:e2e

FROM node:lts-alpine as build
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --from=development /app/node_modules ./node_modules
COPY ./packages/backend ./packages/backend
RUN yarn backend:build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY --chown=node:node --from=config /app .
RUN yarn install --production

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/packages/backend/dist/ ./packages/backend/dist/
EXPOSE 3000
CMD yarn backend
