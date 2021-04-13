FROM node:lts-alpine as development
WORKDIR /app

ENV NODE_ENV=development
ARG DATABASE
ARG DB_HOST
ARG USER
ARG PASSWORD
COPY package.json .
COPY tsconfig.build.json .
RUN npm i
CMD [ "npm", "run", "start:dev" ]

FROM node:lts-alpine as build
ENV NODE_ENV=build
WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:lts-alpine as production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD [ "node", "dist/main.js" ]

EXPOSE 3003
