FROM node:lts-alpine as config
WORKDIR /app
COPY package* tsconfig* startup.sh yarn* ./
COPY ./migration/ ./migration/

FROM node:lts-alpine as testing
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app/ ./
CMD yarn test:unit && yarn test:e2e

FROM node:lts-alpine as build
WORKDIR /app
COPY --from=config /app/ ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY --from=config /app .
RUN yarn install --production --frozen-lockfile && \ 
    yarn add tsconfig-paths

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
RUN mkdir /app/uploads
COPY --chown=node:node --from=build /app/dist/ ./dist/
COPY --chown=node:node --from=config /app/ ./
COPY --chown=node:node --from=node_modules_production /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ./startup.sh
