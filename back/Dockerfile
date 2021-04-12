FROM node:alpine as DEVS
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i

FROM node:alpine as RUNNER
RUN mkdir /app
WORKDIR /app
COPY --from=DEVS /app/node_modules ./node_modules
COPY . .

ARG DATABASE
ARG DB_HOST
ARG USER
ARG PASSWORD

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3003
