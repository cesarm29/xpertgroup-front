# Multi-stage Dockerfile for Angular `front-tailwind` application
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# Production stage
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
# Copy built app (Angular default output: dist/front-tailwind)
COPY --from=build /app/dist/front-tailwind /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
