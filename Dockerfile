# Gunakan image Node.js resmi
FROM node:18-slim

# Set direktori kerja di container
WORKDIR /usr/src/app

# Salin file dependensi terlebih dahulu
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Salin semua file project ke dalam container
COPY . .

# Port yang digunakan oleh aplikasi
EXPOSE 8080

# Environment variable untuk Cloud Run
ENV PORT 8080

# Jalankan aplikasi
CMD ["node", "index.mjs"]