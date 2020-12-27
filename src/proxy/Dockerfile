ARG NGINX_VERSION

FROM nginx:${NGINX_VERSION}

COPY nginx.conf /etc/nginx/nginx.conf
COPY env.conf /etc/nginx/env.conf
COPY static /static/

RUN chmod -R 555 /static/