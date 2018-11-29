FROM node:8-alpine AS development

ENV LISTEN_HOST 0.0.0.0
ENV LISTEN_PORT 80

WORKDIR /app/kotti/
COPY kotti/package.json .
COPY kotti/yarn.lock .
RUN yarn install

CMD "$(npm bin)/nuxt" \
	--hostname $LISTEN_HOST \
	--port $LISTEN_PORT

################################################################################

FROM development AS build
COPY kotti/CHANGELOG.md CHANGELOG.md
COPY kotti/nuxt.config.js .
COPY kotti/packages packages
COPY kotti/README.md README.md
COPY kotti/vue.config.js .
COPY kotti/www www
RUN "$(npm bin)/nuxt" generate

################################################################################

FROM scratch AS static
COPY --from=build /app/kotti/dist/ /

################################################################################

FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/
COPY --from=static / /usr/share/nginx/html/
