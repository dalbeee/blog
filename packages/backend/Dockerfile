FROM node:lts-alpine as config
WORKDIR /app
COPY package.json tsconfig.json yarn.lock ./
COPY ./packages/backend/package*.json \
    ./packages/backend/tsconfig*.json \
    ./packages/backend/

FROM node:lts-alpine as development
USER node
ENV NODE_ENV development
WORKDIR /app
COPY --chown=node:node --from=config /app .
EXPOSE 3000
CMD yarn backend:dev

FROM node:lts-alpine as testing
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
CMD yarn backend:test:e2e

FROM node:lts-alpine as dependency
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node ./packages/core/ ./packages/core/
RUN yarn install --frozen-lockfile
RUN yarn core:build
RUN rm -rf ./src && rm -rf ./node_modules

FROM node:lts-alpine as build
USER node
WORKDIR /app
COPY --chown=node:node ./packages/backend /app/packages/backend
COPY --chown=node:node --from=dependency /app .
RUN yarn install --frozen-lockfile
RUN yarn backend:build

FROM node:lts-alpine as node_modules_production
USER node
WORKDIR /app
COPY --chown=node:node --from=dependency /app .
RUN yarn install --production --frozen-lockfile

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node --from=dependency /app .
COPY --chown=node:node --from=build /app/packages/backend/dist/ ./packages/backend/dist/
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
EXPOSE 3000
CMD yarn backend
