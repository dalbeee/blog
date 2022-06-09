#!/bin/bash

yarn docker:stage:up

cd ./backend && NODE_ENV=test
echo ${NEST_CONFIG_DB_DATABASE_NAME}
yarn test:unit && yarn test:e2e
backendExitCode=$?

cd ../frontend && yarn test:unit && yarn test:e2e
frontendExitCode=$?

cd ../ && yarn docker:stage:down -v

echo ${backendExitCode} ${frontendExitCode}
