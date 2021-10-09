FROM node:lts-alpine as development
ARG DATABASE
ARG DB_HOST
ARG USER
ARG PASSWORD
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY package.json tsconfig.build.json ./
RUN yarn install
EXPOSE 3000
CMD yarn start:dev


FROM node:lts-alpine as testing
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY . .
# ENV CI=true
CMD yarn test:e2e

FROM node:lts-alpine as build
WORKDIR /app
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY . .
RUN yarn install --production

FROM node:lts-alpine as production
USER node
WORKDIR /app
COPY --chown=node:node .env .
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node package.json ./

EXPOSE 3000
CMD yarn start:prod
