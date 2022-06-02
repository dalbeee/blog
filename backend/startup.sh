# if [ ! -f ./config/.initialized ]; then
	echo "initialize..."
	/bin/sh -c "sleep 10 && yarn migration:run"
	# touch ./config/.initialized
# fi

if [ "${NODE_ENV}" == "production" ]; then
	node ./dist/main.js
else   
	yarn start:dev
fi

# exec "$@"
