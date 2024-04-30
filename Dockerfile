FROM node:18 AS builder

ENV NODE_OPTIONS="--max-old-space-size=500"

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma db push
RUN npm run build


RUN apt-get update && apt-get install -y libssl-dev procps


RUN apt-get clean && rm -rf /var/lib/apt/lists/*


EXPOSE $PORT


COPY entrypoint.sh /app
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
