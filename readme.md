# Indonesia-Mongo

Repositori ini terinspirasi dari package laravel [laravolt/indonesia](https://github.com/laravolt/indonesia) yang mengumpulkan semua data berupa (Provinsi, Kabupaten/Kota, Kecamatan dan Desa) di seluruh Indonesia dalam bentuk `mongodb`

Data `csv` diperoleh dari repo [edwardsamuel/Wilayah-Administratif-Indonesia](https://github.com/edwardsamuel/Wilayah-Administratif-Indonesia)

## Impor data ke mongoDB

Repositori ini sudah menyiapkan data matang berupa `indonesia.json` dengan format berikut

```
[{
  id: 01,
  name: 'Nama Provinsi',
  regencies: [{
    id: 0102,
    name: 'Nama Kabupaten',
    districts: [{
      id: 010203,
      name: 'Nama Kecamatan',
      village: [{
        id: 01020304
        nama: 'Nama Desa / Kelurahan'
      }]
    }]
  }]
}]
```

anda hanya perlu melakukan perintah berikut untuk mengimpor ke database mongoDB anda

```
$ MONGO_URL=mongodb://localhost:27017/myapp node importer
```

## Contoh pengambilan data

cara pengambilan data ada di dalam folder [example](/tree/master/example)

```javascript
const mongoose = require('mongoose')
require('./models')
const Indonesia = require('./models/IndonesiaProvince')

const init = async () => {
  // Mendapatkan semua daftar provinsi
  const provinces = await Indonesia.getAllProvince()

  // Mendapatkan provinsi berdasarkan ID
  const province = await Indonesia.getProvince(id)

  // Mendapatkan kabupaten berdasarkan ID
  const regency = await Indonesia.getRegency(id)

  // Mendapatkan kecamatan berdasarkan ID
  const district = await Indonesia.getDistrict(id)

  // Mendapatkan desa / kelurahan berdasarkan ID
  const village = await Indonesia.getVillage(id)
}

init()
```

## Parsing data

Untuk mengubah data `csv` ke `indonesia.json`

Letakan file `*.csv` yang ada di [edwardsamuel/Wilayah-Administratif-Indonesia/csv](https://github.com/edwardsamuel/Wilayah-Administratif-Indonesia/tree/master/csv) ke folder `csv`

lakukan perintah

```
$ node parser
```
