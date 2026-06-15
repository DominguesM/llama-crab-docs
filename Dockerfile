# syntax=docker/dockerfile:1

# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@11.0.9

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Nuxt
RUN pnpm nuxt prepare && pnpm nuxt build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install only production dependencies
RUN npm install -g pnpm@11.0.9

# Copy built output
COPY --from=builder /app/.output ./output
COPY --from=builder /app/package.json ./

# Install deps and keep only production
RUN pnpm install --frozen-lockfile --prod && pnpm store prune

# Start server
EXPOSE 3000
ENV PORT=3000
CMD ["node", "output/server/index.mjs"]
