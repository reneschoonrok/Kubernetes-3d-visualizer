FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY public ./public/
COPY router ./router/
COPY views ./views/

RUN npm i ejs --production
RUN npm i kubernetes-client --production
RUN npm i express --production
EXPOSE 80
CMD [ "node", "./router/server.js" ]