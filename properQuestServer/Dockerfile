#Build For Backend
FROM node:20-alpine AS builder
LABEL "Author"="Meek"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


#Production Stage
FROM node:20-alpine
WORKDIR /app


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/index.js"]





