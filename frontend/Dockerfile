FROM node:lts-alpine as development
ENV NODE_ENV development
RUN mkdir -p /app/.next
RUN chown -R node:node /app
USER node
WORKDIR /app
COPY package.json .
RUN npm i
EXPOSE 3000
CMD npm run dev

FROM node:lts-alpine as build
WORKDIR /app
COPY . .
COPY --from=development /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY . .
RUN npm i --production

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node package.json .
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/next.config.js .
EXPOSE 3000
CMD node dist/main.js
