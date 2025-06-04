FROM node:18-alpine

WORKDIR /app/frontend

COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm install

COPY frontend/. .

RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]