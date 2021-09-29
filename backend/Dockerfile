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
RUN npm i
EXPOSE 3000
CMD npm run start:dev

FROM node:lts-alpine as build
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY . .
RUN npm i --production

FROM node:lts-alpine as production
USER node
WORKDIR /app
COPY --chown=node:node .env .
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node package.json ./

EXPOSE 3000
CMD npm run start:prod
