FROM node:25.6.0-bookworm

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]

