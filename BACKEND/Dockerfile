FROM node:latest AS deps
WORKDIR /app

COPY BACKEND/package*.json ./
RUN npm install --omit-dev


FROM node:latest AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY BACKEND ./


FROM node:latest AS runner
WORKDIR /app
ENV NODE_ENV Development

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=builder --chown=expressjs:nodejs /app ./
RUN chown -R expressjs:nodejs /app

USER expressjs

EXPOSE 3500
ENV PORT 3500

CMD [ "npm", "start" ]