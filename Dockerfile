# =============================================
# Multi-stage Dockerfile for GitHub Pages / Static Site
# =============================================

# -------------------
# Builder stage
# -------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (Fixed)
RUN npm ci || npm install

# Copy the rest of the source code
COPY . .

# Build the project (if build script exists)
RUN npm run build || echo "No build script found - skipping build"

# -------------------
# Production stage
# -------------------
FROM nginx:alpine AS production

# Copy built files (try common output folders)
COPY --from=builder /app/dist /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/build /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/_site /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/public /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app . /usr/share/nginx/html

# Nginx config
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
