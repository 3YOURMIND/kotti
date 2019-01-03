FROM node:8-alpine AS development

ENV LISTEN_HOST 0.0.0.0
ENV LISTEN_PORT 80

WORKDIR /app/
COPY package.json .
COPY yarn.lock .
RUN yarn install

CMD "$(npm bin)/nuxt" \
	--hostname $LISTEN_HOST \
	--port $LISTEN_PORT

################################################################################

FROM development AS build
COPY CHANGELOG.md CHANGELOG.md
COPY nuxt.config.js .
COPY packages packages
COPY README.md README.md
COPY vue.config.js .
COPY docs docs
RUN "$(npm bin)/nuxt" generate

################################################################################

FROM scratch AS static
COPY --from=build /app/dist/ /

################################################################################

FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/
COPY --from=static / /usr/share/nginx/html/
