FROM node:18-alpine

WORKDIR /app

COPY app-taxi-api/package.json ./

RUN npm install

COPY ./app-taxi-api/ .

EXPOSE 8080

CMD ["npm", "run", "dev"]
