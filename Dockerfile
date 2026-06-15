# syntax=docker/dockerfile:1

# Build stage
# --platform=$BUILDPLATFORM ensures the build runs natively on the host architecture
# (e.g. ARM64 on Apple Silicon) instead of under QEMU emulation, which causes
# esbuild/Vite to hang indefinitely during the "transforming..." phase.
# The output (HTML/CSS/JS) is architecture-independent so this is safe.
FROM --platform=$BUILDPLATFORM oven/bun:1 AS builder

WORKDIR /app

# Disable interactive progress output (prevents Vite from hanging in non-TTY environments)
ENV CI=true
ENV NO_COLOR=1

# Copy package files
COPY package.json ./

# Install dependencies (lockfile generated inside the container for the correct platform)
RUN bun install

# Copy source
COPY . .

# Build
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy built output only
COPY --from=builder /app/.output ./output

# Start server
EXPOSE 3000
ENV PORT=3000
CMD ["bun", "run", "output/server/index.mjs"]
