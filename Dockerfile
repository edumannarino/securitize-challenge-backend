FROM node:16-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]