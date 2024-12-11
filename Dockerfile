FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . ./

RUN npm run build

CMD ["sh", "-c", "HOST=0 PORT=8080 npm run start"]
