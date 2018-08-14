FROM node:8-alpine as development

ENV LISTEN_HOST 0.0.0.0
ENV LISTEN_PORT 80

WORKDIR /usr/share/app
COPY package.json .
COPY yarn.lock .

RUN yarn install

CMD "$(npm bin)/gulp" build --gulpfile ./build/gulpstyle.js \
	&& "$(npm bin)/nuxt" \
		--hostname $LISTEN_HOST \
		--port $LISTEN_PORT \
		-c build/nuxt.config.js

################################################################################

FROM development as build
COPY build build
COPY packages packages
COPY src src
COPY www www
RUN "$(npm bin)/nuxt" generate -c build/nuxt.config.js

################################################################################

FROM nginx:alpine as production
RUN rm -rf /usr/share/nginx/html/
COPY --from=build /usr/share/app/dist/ /usr/share/nginx/html/
