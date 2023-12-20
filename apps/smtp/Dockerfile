FROM node:18 as build
WORKDIR /usr/src/app
RUN pwd
# package.json is in the root of the monorepo
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# run pwd to see where you are
RUN npm run build smtp

FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
CMD ["dumb-init", "node", "dist/apps/smtp/main"]