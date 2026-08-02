FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build Next.js application
RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "app.js"]

