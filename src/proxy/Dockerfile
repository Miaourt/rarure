ARG NGINX_VERSION=1.23-alpine

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}

RUN rm -r /etc/nginx/conf.d

COPY conf.d /etc/nginx/conf.d

COPY html /usr/share/nginx/html

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"] 