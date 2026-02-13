const express = require('express')
const app = express()
const port = 4090


app.set('view engine', 'ejs')
app.set('views', './view')

app.get('/', (req, res) => {
  res.render(`beranda`)
})

app.get('/profil', (req, res) => {
  res.render(`profil`)
})

app.use((req, res, next) => {
  res.status(404).send(`
    <h1>Halaman Tidak Ditemukan</h1>
    <hr>
    <button><a href="/">Kembali ke Beranda</a></button>
  `)
});

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port http://localhost:${port}`)
})