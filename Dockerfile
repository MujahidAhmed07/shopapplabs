FROM node:20-alpine

WORKDIR /app

# Copy root and backend packages
COPY package.json ./
COPY backend/package.json ./backend/

# Install backend dependencies
RUN npm --prefix backend install --production

# Copy backend source code
COPY backend ./backend

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

CMD ["node", "backend/src/server.js"]
