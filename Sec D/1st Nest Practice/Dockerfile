FROM node:20 AS base

RUN npm install -g pnpm pm2
WORKDIR /var/www/backend
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --prod

FROM base AS builder
WORKDIR /var/www/backend
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM base AS production
WORKDIR /var/www/backend
COPY --from=builder /var/www/backend/dist /var/www/backend/dist
# COPY --from=builder /var/www/backend/.env /var/www/backend/.env

CMD ["node" , "dist/main.js"]
# CMD ["pm2-runtime","-i","max","dist/main.js"]
