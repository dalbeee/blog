FROM node:lts-alpine as config
WORKDIR /app
COPY package* tsconfig* yarn* ./

FROM cypress/included:10.0.2 as e2e
WORKDIR /app
RUN yarn add -D typescript
COPY cypress* tsconfig.json ./
COPY cypress/ ./cypress/
ENTRYPOINT [ "/bin/sh", "-c", "sleep 5 && npx cypress run"]

FROM node:lts-alpine as build
ARG ANALYZE=true
WORKDIR /app
COPY --from=config /app .
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine as node_modules_production
WORKDIR /app
COPY --from=config /app .
RUN yarn install --production

FROM node:lts-alpine as production
ENV NODE_ENV production
USER node
WORKDIR /app
RUN mkdir -p /app/public/uploads
COPY --chown=node:node --from=config /app/ ./
COPY --chown=node:node --from=build /app/.next/ ./.next/
COPY --chown=node:node --from=build /app/next.config.js ./next.config.js
COPY --chown=node:node --from=node_modules_production /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD yarn start
