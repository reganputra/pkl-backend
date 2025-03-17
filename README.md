# Documentasi API
- API untuk Produk
  1. Menambahkan Produk (POST) : /api/items
        Request Body form-data :
     {
     "name": Text,
     "kodeBarang": Text,
     "quantity": Text,
     "category": Text,
     "image": File,
     "ukuranKemasan": Text,
   }
  2. Mengedit Produk (PUT) : /api/items/{id}
  3. Melihat Seluruh Produk (GET) : /api/items
  4. Melihat Satu Produk (GET) : /api/items/{id}
  5. Menghapus Produk (DELETE) : /api/items/{id}
  6. Menambahkan Kuantitas Produk (PATCH) : /api/items/{id}/add-quantity
  7. Mengurangi Kuantitas Produk (PATCH) : /api/items/{id}/subtract-quantity
- API untuk user :
  1. Regiter User (POST) : /api/users/register
  2. Login User (POST) : /api/users/login
