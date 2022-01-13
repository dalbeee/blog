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
ARG SSR_API_URL=$SSR_API_URL
ARG NEXT_PUBLIC_HTTP_PROTOCOL=$NEXT_PUBLIC_HTTP_PROTOCOL
ARG NEXT_PUBLIC_LOCAL_HOST=$NEXT_PUBLIC_LOCAL_HOST
ARG NEXT_PUBLIC_LOCAL_HOST_PORT=$NEXT_PUBLIC_LOCAL_HOST_PORT
ENV ANALYZE=true
USER node
WORKDIR /app
RUN echo {"env:" $SSR_API_URL } > env_result.txt
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
# ENV NEXT_PUBLIC_LOCAL_HOST=$NEXT_PUBLIC_LOCAL_HOST
USER node
WORKDIR /app
COPY --chown=node:node --from=source /app .
COPY --chown=node:node --from=build /app/.next/ ./.next/
COPY --chown=node:node --from=build /app/env_result* ./
COPY --chown=node:node --from=node_modules_production /app/node_modules ./node_modules
EXPOSE 3000
CMD yarn start
