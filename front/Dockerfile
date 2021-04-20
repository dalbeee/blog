FROM node:alpine as development
ENV NODE_ENV=development
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm i --force
CMD [ "npm", "run", "dev" ]

FROM node:alpine as build
ARG NODE_ENV=build
ENV IS_BUILD=true
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:alpine as production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY package.json .
COPY public ./public

CMD [ "npm", "start" ]
EXPOSE 3000
