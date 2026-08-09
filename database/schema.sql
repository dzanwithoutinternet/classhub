CREATE DATABASE IF NOT EXISTS classhub_db;
USE classhub_db;

CREATE TABLE tb_siswa (
    nis VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    jenis_kelamin ENUM('L', 'P') NOT NULL,
    role ENUM('siswa', 'bendahara', 'ketua') DEFAULT 'siswa'
);

CREATE TABLE tb_kas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jenis ENUM('masuk', 'keluar') NOT NULL,
    nominal DECIMAL(12, 2) NOT NULL,
    keterangan TEXT NOT NULL,
    foto_nota VARCHAR(255) NULL,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tb_piket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hari ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat') NOT NULL,
    siswa_nis VARCHAR(20),
    status ENUM('belum', 'selesai') DEFAULT 'belum',
    FOREIGN KEY (siswa_nis) REFERENCES tb_siswa(nis) ON DELETE cascade
);

CREATE TABLE tb_inventaris (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_barang VARCHAR(100) NOT NULL,
    kode_barang VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('tersedia', 'dipinjam', 'rusak') DEFAULT 'tersedia',
    peminjam_nama VARCHAR(100) NULL,
    tgl_pinjam DATETIME NULL,
    tgl_kembali DATETIME NULL
);