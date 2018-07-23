FROM node:8-alpine as development

WORKDIR /usr/share/app
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY build build
COPY packages packages
COPY src src

RUN $(npm bin)/gulp build --gulpfile ./build/gulpstyle.js

CMD $(npm bin)/gulp build --gulpfile ./build/gulpstyle.js \
	&& $(npm bin)/nuxt \
		--hostname 0.0.0.0 \
		--port 80 \
		-c build/nuxt.config.js
