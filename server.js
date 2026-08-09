const express = require('express')
const cors = require('cors');
const path = require('path');
const db = require('./database/db')

const app = express()
const PORT = 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (req,res) => {
    res.json({
        status: 'success',
        message: 'Server ClassHub SMKN 1 Jakarta berhasil berjalan',
        waktu: new Date()
    })
})

app.get('/api/kas', async (req, res) => {
    try {
        const [transaksi] = await db.query('SELECT * FROM tb_kas ORDER BY created_at DESC')
        
        const [totalMasuk] = await db.query("SELECT SUM(nominal) AS total FROM tb_kas WHERE jenis = 'masuk' ")

        const [totalKeluar] = await db.query("SELECT SUM(nominal) AS total FROM tb_kas WHERE jenis = 'keluar' ")

        const masuk = Number(totalMasuk[0].total) || 0
        const keluar = Number(totalKeluar[0].total) || 0
        const saldo = masuk - keluar

        res.json({
            status: 'success',
            data: {
                saldo: saldo,
                total_masuk: masuk,
                total_keluar: keluar,
                riwayat: transaksi
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil data kas: ' + err.message
        })
    }
})

async function testDatabaseConnection () {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS hasil')
        console.log('Berhasil terhubung ke database MySQL (classhub_db)')
    } catch (err) {
        console.error('Gagal terhubung ke database My SQL', err.message)
    }
}

testDatabaseConnection()

app.listen(PORT, () => {
    console.log(`Server ClassHub aktif di http://localhost:${PORT}`)
})