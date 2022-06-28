# Build the project
FROM node as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serve the static files
FROM nginx
COPY --from=node /app/dist/noq-ui /usr/share/nginx/html