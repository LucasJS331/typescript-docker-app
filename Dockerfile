FROM node

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . . /app/

CMD [ "node", "./dist/src/index.js" ]

EXPOSE 5000