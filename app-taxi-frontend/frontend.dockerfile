FROM node:18-alpine

WORKDIR /app

COPY app-taxi-frontend/package.json ./

RUN npm install

COPY ./app-taxi-frontend/ .

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--port", "80"]
