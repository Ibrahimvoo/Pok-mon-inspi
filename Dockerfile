# Production image: builds the client and runs the API/WebSocket server that also serves it.
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build && npm prune --omit=dev --ignore-scripts

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=8080 TRUST_PROXY=1 DATABASE_URL=/app/data/ps5ux.sqlite
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/data.js ./src/data.js
COPY --from=build /app/src/avatars.js ./src/avatars.js
COPY --from=build /app/src/among/core ./src/among/core
COPY package.json ./
RUN mkdir -p /app/data && chown -R node:node /app/data
USER node
VOLUME /app/data
EXPOSE 8080
HEALTHCHECK CMD wget -qO- http://localhost:8080/api/health || exit 1
CMD ["node", "--no-warnings", "server/index.js"]
