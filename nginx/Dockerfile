FROM nginx:alpine

RUN mkdir /mnt/storage -p
WORKDIR /etc/nginx/conf.d/

RUN rm /etc/nginx/conf.d/default.conf
# RUN rm /usr/share/nginx/html/index.html

# COPY ./nginx.conf /etc/nginx/conf.d
COPY ./front-only.conf /etc/nginx/conf.d
# COPY ./index.html /usr/share/nginx/html

# RUN adduser -S www-data -u 1000
# RUN usermod -u www-data www-data
RUN chown -R 101:101 /mnt/storage

EXPOSE 80
