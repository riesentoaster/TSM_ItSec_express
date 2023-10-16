FROM node:current-alpine
COPY main.js package.json ./
RUN npm install
EXPOSE 5000
CMD ["node", "main.js"]

# docker build . --tag express-xss
# docker run --detach --name express-xss --publish 5000:5000 express-xss
# docker stop express-xss
# docker rm express-xss