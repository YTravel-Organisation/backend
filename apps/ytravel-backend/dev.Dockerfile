FROM node:18 as build
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build ytravel-backend

EXPOSE 3000
CMD ["npm", "run", "start:dev", "ytravel-backend"]