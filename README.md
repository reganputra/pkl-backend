# Documentasi API

## Endpoint untuk Produk

- **GET** `/api/items` : Melihat Seluruh Produk
- **GET** `/api/items/:id` : Melihat Satu Produk berdasarkan kode barang
- **POST** `/api/items` : Menambahkan Produk
- Request Body form-data : { "name": Text, "kodeBarang": Text, "quantity": Text, "category": Text, "image": File, "ukuranKemasan": Text, }
- **PUT** `/api/items/:id` : Mengedit Produk
- **DELETE** `/api/items/:id` : Delete product by id
- **PATCH** `/api/items/:id/update-quantity` : Update product by id
- Request Body form-data : { "quantity": Integer, }

## Endpoint untuk User

- **POST** `/api/users/register` : Register User
- Request Body form-data : { "username": Text, "email": Text, "password": Text,}
- **POST** `/api/users/login` : Login User
- Request Body form-data : { "email": Text, "password": Text, }

## Endpoint untuk Riwayat

- **GET** `/api/riwayat/` : getAll riwayat
- **GET** `/api/riwayat/year/month` : get riwayat base on month and year

## Endpoint untuk PO

- **POST** `/api/po/` : Pembuatan PO otomatis tanpa inputan user

## Endpoint untuk surat jalan

- **POST** `api/surat-jalan` : untuk membuat surat jalan pastikan kalian inputin atribut noSuratJalan harus sama dengan nomorPO yang ada di database kalau tidak pasti error dan noSuratJalan ini aku stel tidak bisa sama satu sama lain jadi kalau kalian masukin noSuratJalan yang sama akan ada pesan error
