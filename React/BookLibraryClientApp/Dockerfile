FROM node:alpine as builder
ARG API_URL
ENV API_URL $API_URL
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html