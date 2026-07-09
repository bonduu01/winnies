# =============================================
# Multi-stage Dockerfile for GitHub Pages sites
# =============================================

# -------------------
# Builder stage
# -------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the project (if you have a build script)
# Uncomment/adjust if using Vite, React, Next.js (static export), Hugo, etc.
RUN npm run build || echo "No build script found - using source as-is"

# -------------------
# Production stage (lightweight static server)
# -------------------
FROM nginx:alpine AS production

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/build /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/_site /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app/public /usr/share/nginx/html 2>/dev/null || \
     COPY --from=builder /app . /usr/share/nginx/html

# Optional: Copy custom nginx config for GitHub Pages-like behavior
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html index.htm;

    # GitHub Pages style SPA fallback (for React, Vue, etc.)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Security headers (recommended)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff2?|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
