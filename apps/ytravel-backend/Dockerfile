FROM node:18 as build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev", "ytravel-backend"]