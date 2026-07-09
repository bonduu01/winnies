# =============================================
# Simple Dockerfile for Static Website (GitHub Pages style)
# =============================================

FROM nginx:alpine

# Copy all static files to nginx html directory
COPY . /usr/share/nginx/html

# Custom Nginx configuration (SPA fallback + caching)
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Important: Serve index.html for all routes (for single-page behavior if needed)
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff2?|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

EXPOSE 80

# Health check
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
