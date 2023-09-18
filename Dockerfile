FROM node:current-alpine
COPY main.js package.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "main.js"]

# docker build . -t express-example
# docker run --detach --name express-example --publish 3000:3000 express-example
# docker stop express-example
# docker rm express-example