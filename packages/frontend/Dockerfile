FROM node:lts-alpine as config
WORKDIR /app
USER node
COPY package.json tsconfig.json yarn.lock ./
COPY ./packages/frontend/package*.json \
    ./packages/frontend/tsconfig*.json \
    ./packages/frontend/next.config.js \
    ./packages/frontend/

FROM node:lts-alpine as development
ENV NODE_ENV development
RUN mkdir -p /app/.next
RUN chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node --from=config /app .
RUN yarn install
COPY --chown=node:node ./packages/frontend /app/packages/frontend/
EXPOSE 3000
CMD yarn frontend:dev

FROM node:lts-alpine as dependency
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY ./packages/core/package.json ./packages/core/package.json
COPY ./packages/core/ ./packages/core/
RUN npm i

FROM node:lts-alpine as build
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node --from=dependency /app .
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node ./packages/frontend /app/packages/frontend/
RUN yarn frontend:build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node --from=dependency /app .
COPY --chown=node:node ./packages/frontend /app/packages/frontend/
RUN yarn install --production

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/packages/frontend/.next/ ./packages/frontend/.next/
EXPOSE 3000
CMD yarn frontend
