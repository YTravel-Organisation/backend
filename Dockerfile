FROM node:18 AS build
WORKDIR /app
COPY package.json /app
RUN npm install

FROM build AS base
COPY . .
RUN npx prisma generate
RUN chmod +x build-all.sh
RUN ./build-all.sh

FROM base AS dbgenerator
CMD ["npx", "prisma", "db", "push"]


FROM node:18-slim AS smtp
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=base /app/dist/apps/smtp ./dist/apps/smtp
COPY --chown=node:node --from=base /app/.env .env
COPY --chown=node:node --from=base /app/node_modules  ./node_modules

ENV NODE_ENV production
CMD ["dumb-init", "node", "dist/apps/smtp/main"]


FROM node:18-slim AS ytraveling
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=base /app/dist/apps/ytraveling-backend ./dist/apps/ytraveling-backend
COPY --chown=node:node --from=base /app/.env .env
COPY --chown=node:node --from=base /app/node_modules/.prisma/client  ./node_modules/.prisma/client
COPY --chown=node:node --from=base /app/node_modules/@prisma/client  ./node_modules/@prisma/client
COPY --chown=node:node --from=base /app/node_modules  ./node_modules

ENV NODE_ENV production
CMD ["dumb-init", "node", "dist/apps/ytraveling-backend/main"]

