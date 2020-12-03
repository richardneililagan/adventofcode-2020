FROM node:14.15 AS builder

COPY .n*mrc ./
COPY package*.json ./
RUN npm install --only=production

# :: ---

FROM node:14.15-slim

WORKDIR app

COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./package.json .
COPY ./src ./src

ENTRYPOINT ["/usr/local/bin/node", "/app/src/benchmark"]
CMD ["001", "easy"]
