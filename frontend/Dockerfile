FROM node:lts-alpine as config
WORKDIR /app
COPY --chown=node:node package* tsconfig* ./

FROM node:lts-alpine as development
ENV NODE_ENV development
USER node
WORKDIR /app
COPY --chown=node:node --from=config /app .
EXPOSE 3000
CMD yarn dev

FROM node:lts-alpine as source
USER node
WORKDIR /app
COPY . .

FROM node:lts-alpine as build
ARG ANALYZE=true
ARG NEXT_PRIVATE_SSR_API_URL
ARG NEXT_PUBLIC_CONFIG_IMAGE_HOST
ARG NEXT_PUBLIC_CSR_API_URL
ARG NEXT_PUBLIC_ALL_STATIC_URL
ARG NEXT_PUBLIC_ALL_IMAGE_PROVIDER
ARG NEXT_PUBLIC_ALL_HTTP_SCHEMA
ENV NEXT_PRIVATE_SSR_API_URL=$NEXT_PRIVATE_SSR_API_URL
ENV NEXT_PUBLIC_CONFIG_IMAGE_HOST=$NEXT_PUBLIC_CONFIG_IMAGE_HOST
ENV NEXT_PUBLIC_CSR_API_URL=$NEXT_PUBLIC_CSR_API_URL
ENV NEXT_PUBLIC_ALL_STATIC_URL=$NEXT_PUBLIC_ALL_STATIC_URL
ENV NEXT_PUBLIC_ALL_IMAGE_PROVIDER=$NEXT_PUBLIC_ALL_IMAGE_PROVIDER
ENV NEXT_PUBLIC_ALL_HTTP_SCHEMA=$NEXT_PUBLIC_ALL_HTTP_SCHEMA
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
COPY --chown=node:node --from=source /app .
COPY --chown=node:node --from=build /app/.next/ ./.next/
COPY --chown=node:node --from=build /app/env_result* ./
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
EXPOSE 3000
CMD yarn start
