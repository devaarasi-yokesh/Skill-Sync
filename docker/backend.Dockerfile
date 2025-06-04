FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

WORKDIR /app/backend

#ENV NODE_ENV=production






EXPOSE 5000
CMD ["node", "server.js"]