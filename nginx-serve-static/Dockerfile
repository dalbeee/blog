FROM nginx:alpine
WORKDIR /app
RUN rm /etc/nginx/conf.d/default.conf
COPY ./production.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
