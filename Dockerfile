# Use official Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .


# Port used by the application
EXPOSE 8080

# Environment variable for Cloud Run
ENV PORT 8080

# Set Node to production mode
ENV NODE_ENV production

# Run the application
CMD ["node", "index.mjs"]