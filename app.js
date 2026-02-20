const express   = require('express')
const app       = express()
const port      = 4090

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')   //setting penggunaan template engine untuk express
app.set('views', './view')      //setting penggunaan folder untuk menyimpan file .ejs


app.get('/', (req, res) => {
    res.render('beranda')
})

app.get('/profil', (req, res) => {
    res.render('profil')
})

app.get('/pengalaman', (req, res) => {
    let namaLengkap = 'Aji Kowiyu'
    // 1. data harus dikirim ke view
    // 2. data harus dipanggil di dalam view
    res.render('detail-pengalaman', {
        nama: namaLengkap,
        alamat: 'Pluit, Jakarta Utara',
        posisi: 'Programmer',
        perusahaan: 'PT Freeport Jaya Makmur',
        gaji: 9000000
    })
})

// synchronous = berjalan berurutan
// asynchronous = berjalan tidak berurutan
app.get('/karyawan', async (req,res)=>{
    res.render('karyawan/all', {
        req: req,
        data_karyawan: await require('./model/m_karyawan').get_semua_karyawan()
    })
})

app.get('/karyawan/detail/:id_kry', async (req,res)=>{
    let id_kry = req.params.id_kry
    res.render('karyawan/profil', {
        profil_karyawan: await require('./model/m_karyawan').get_1_karyawan(id_kry)
    })
})

app.get('/karyawan/hapus/:id_kry', async (req,res)=>{
    let id_kry = req.params.id_kry
    let proses_hapus = await require('./model/m_karyawan').delete_1_karyawan(id_kry)
    if (proses_hapus.affectedRows > 0) {
        res.redirect('/karyawan')
    }
})

app.get('/karyawan/tambah', async (req,res)=>{
    res.render('karyawan/form-tambah', {
        req:req,
        agama: await require('./model/m_agama').get_semua_agama(),
        jabatan: await require('./model/m_jabatan').get_semua_jabatan()
    })
    
})

app.post('/karyawan/proses-insert', async (req,res)=>{
    try {
        let proses_insert = await require('./model/m_karyawan').insert_1_karyawan(req)
        if (proses_insert.affectedRows > 0) {
            res.redirect('/karyawan?success_msg=Data berhasil ditambahkan '+ req.body.form_nama)
        }
    } catch(error) {
        console.log(error)
        res.redirect('/karyawan/tambah?error_msg=' + error.errno +': '+ error.sqlMessage)
    }
})

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`)
})