FROM node:8-alpine AS development

ENV LISTEN_HOST 0.0.0.0
ENV LISTEN_PORT 80

WORKDIR /app/kotti/
COPY kotti/package.json .
COPY kotti/yarn.lock .
RUN yarn install

CMD "$(npm bin)/nuxt" \
		--hostname $LISTEN_HOST \
		--port $LISTEN_PORT \
		-c build/nuxt.config.js

################################################################################

FROM development AS build
COPY kotti/build build
COPY kotti/packages packages
COPY kotti/CHANGELOG.md CHANGELOG.md
COPY kotti/README.md README.md
COPY kotti/src src
COPY kotti/www www
RUN "$(npm bin)/nuxt" generate -c build/nuxt.config.js

################################################################################

FROM scratch AS static
COPY --from=build /app/kotti/docs/ /

################################################################################

FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/
COPY --from=static / /usr/share/nginx/html/
