FROM node:18-alpine AS builder

WORKDIR /app

ENV CI=true

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm install

CMD ["pnpm", "dev"]