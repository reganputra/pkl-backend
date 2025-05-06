# Use official Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Port used by the application
EXPOSE 8080

# Environment variable for Cloud Run
ENV PORT 8080

# Add healthcheck (if your app has a health endpoint)
# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:8080/health || exit 1

# Set Node to production mode
ENV NODE_ENV production

# Run the application
CMD ["node", "index.mjs"]