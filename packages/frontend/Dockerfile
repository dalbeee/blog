FROM node:lts-alpine as config
WORKDIR /app
COPY package.json tsconfig.json yarn.lock ./
COPY ./packages/frontend/package*.json \
    ./packages/frontend/tsconfig*.json \
    ./packages/frontend/next.config.js \
    ./packages/frontend/

FROM node:lts-alpine as development
ENV NODE_ENV development
WORKDIR /app
COPY --chown=node:node --from=config /app .
EXPOSE 3000
CMD yarn frontend:dev

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
COPY --chown=node:node --from=dependency /app .
COPY --chown=node:node ./packages/frontend /app/packages/frontend
RUN yarn install --frozen-lockfile
RUN yarn frontend:build

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
COPY --chown=node:node --from=build /app/packages/frontend/.next/ ./packages/frontend/.next/
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
EXPOSE 3000
CMD yarn frontend
