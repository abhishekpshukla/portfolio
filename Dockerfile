FROM node:8.16.0-alpine

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
EXPOSE 3000
COPY . .

CMD ["npm", "start"]
