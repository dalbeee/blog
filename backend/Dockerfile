FROM node:lts-alpine as config
WORKDIR /app
COPY --chown=node:node package* tsconfig* ./

FROM node:lts-alpine as development
USER node
ENV NODE_ENV development
WORKDIR /app
COPY --chown=node:node --from=config /app .
EXPOSE 3000
CMD yarn start:dev

FROM node:lts-alpine as testing
RUN mkdir -p /app/dist
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
CMD yarn test:e2e

FROM node:lts-alpine as source
USER node
WORKDIR /app
COPY . .


FROM node:lts-alpine as build
USER node
WORKDIR /app
COPY --chown=node:node --from=source /app .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts-alpine as node_modules_production
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
RUN yarn install --production --frozen-lockfile

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/dist/ ./dist/
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "./dist/main.js"]
