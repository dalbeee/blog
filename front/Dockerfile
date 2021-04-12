FROM node:alpine as development
WORKDIR /app
COPY package.json .
RUN npm i --force
CMD [ "npm", "run", "dev" ]

FROM node:alpine as build
WORKDIR /app
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:alpine as production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY public ./public

CMD [ "npm", "start" ]
EXPOSE 3000
