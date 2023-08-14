ARG NGINX_VERSION=1.24-alpine

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}

RUN rm -r /etc/nginx/conf.d

COPY conf.d /etc/nginx/conf.d

COPY html /usr/share/nginx/html

RUN ls -lah /var/cache/nginx

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"] 
