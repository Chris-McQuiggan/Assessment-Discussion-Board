FROM node:8 as node-build
WORKDIR /build
COPY . .
RUN npm install
EXPOSE 5000
ENTRYPOINT ["node", "server.js"]