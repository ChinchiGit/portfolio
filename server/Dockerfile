FROM node:latest
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
COPY ./.env .env
EXPOSE 5000
CMD ["node", "index.js"]
