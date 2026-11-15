# Berkas Submission — Siap Tempel

## 1. Judul Karya

```
LATMA SIBER — Peta Risiko, Detection Pack, dan Pengukuran Kesiapan Siber Satuan
```

## 2. Deskripsi Ide (versi pendek, ±120 kata — untuk form pendaftaran)

```
LATMA SIBER mengubah inventaris aset satuan menjadi tiga keluaran operasional sekaligus.

Pertama, peta risiko: dari daftar aset dan kelemahannya, sistem menghitung indeks paparan 0–100, jalur serangan paling mungkin menuju aset kritis, titik kritis yang memutus banyak jalur, serta kontrol prioritas per aset — tanpa pemindaian aktif, sehingga aman dijalankan pada jaringan operasional.

Kedua, Detection Pack: setiap skenario dibangkitkan menjadi aturan deteksi Sigma siap pasang di SIEM satuan (Wazuh, Elastic, Splunk, Sentinel) beserta daftar indikator ancaman.

Ketiga, indeks kesiapan personel: enam kompetensi dinilai melalui latihan tabletop atau lab, lalu dirangkum menjadi risiko bersih satuan — paparan teknis dikali kesiapan manusia.

Seluruh sistem berjalan on-premise, tanpa internet, pada satu laptop satuan. Kategori: Dukungan Teknologi (Core Infra).
```

## 3. Deskripsi Ide (versi panjang — untuk slide/deskripsi project)

```
MASALAH
Satuan memiliki daftar aset dan daftar kelemahan, tetapi tidak memiliki cara mengubahnya menjadi keputusan: jalur mana yang paling mungkin ditembus, kontrol mana yang harus ditutup lebih dulu, dan apakah personelnya mampu merespons. Solusi yang ada menuntut pemindaian aktif yang berisiko pada jaringan operasional, berjalan di cloud yang tidak boleh dipakai, atau berhenti pada dashboard tanpa keluaran yang bisa dieksekusi.

SOLUSI — TIGA KELUARAN DARI SATU INVENTARIS

1. Peta Risiko. Model heuristik yang menghitung indeks paparan 0–100, memeringkat jalur serangan dari titik masuk publik sampai aset kritis, mengidentifikasi choke point yang memutus banyak jalur sekaligus, dan menerjemahkannya menjadi kontrol prioritas per aset. Tidak melakukan pemindaian aktif, sehingga aman dijalankan di jaringan yang sedang beroperasi.

2. Detection Pack. Dari teknik MITRE ATT&CK pada skenario, sistem membangkitkan aturan deteksi berformat Sigma lengkap dengan logsource, kondisi, false positive, dan level — siap dipasang pada SIEM satuan. Latihan tidak berhenti pada nilai; ia meninggalkan pertahanan yang bisa langsung dipakai.

3. Indeks Kesiapan Personel. Latihan tabletop (tanpa jaringan) atau lab terisolasi menilai enam kompetensi: deteksi, penahanan, pemulihan, forensik, pelaporan, dan komando. Hasilnya digabungkan dengan paparan teknis menjadi risiko bersih satuan, sehingga pimpinan melihat satu angka yang bergerak ketika personel dilatih atau aset diperbaiki.

DAMPAK
Menyusun satu skenario: 3 hari kerja menjadi 4 detik. Biaya pelaksanaan: puluhan juta rupiah menjadi nol. Persiapan fasilitator: 1–2 minggu menjadi 45 menit. Penilaian: dari kesan menjadi indeks yang dapat dibandingkan antar-waktu dan antar-satuan. Setiap latihan menghasilkan artefak pertahanan (aturan deteksi) yang dapat langsung diterapkan.

KELAYAKAN
Berjalan di satu laptop atau mini-PC satuan, tanpa dependensi eksternal, tanpa internet, tanpa pemindaian aktif. Tersedia versi statis yang berjalan penuh di peramban. Roadmap: pilot lima satuan (0–3 bulan), papan kesiapan pusat dan perpustakaan skenario (3–9 bulan), lab terisolasi dan sertifikasi kompetensi (9–18 bulan).
```

## 4. Kategori

```
Dukungan Teknologi (Core Infra)
```

## 5. Teknologi

```
Node.js (tanpa dependensi eksternal) · Vanilla JavaScript · SVG · Sigma (format aturan deteksi) · Docker (mode lab, rancangan)
```

## 6. Tautan yang Disubmit

| Item | Isi |
|---|---|
| Link karya | `https://kisworo.github.io/latma-siber/` |
| Repositori | `https://github.com/kisworo/latma-siber` |
| Video presentasi | `<link YouTube unlisted>` |
| Slide penjelasan | `LATMA-SIBER-Deck.pdf` (12 halaman) |

## 7. Checklist Submission

- [ ] Link karya dapat dibuka tanpa login, di peramban apa pun.
- [ ] Link karya diuji di jendela penyamaran (incognito).
- [ ] Video presentasi: akses "siapa saja yang memiliki link", durasi ≤ 3 menit.
- [ ] Slide PDF terunggah dan dapat diunduh.
- [ ] Deskripsi ide sudah ditempel di halaman submission CODEPOLITAN.
- [ ] Nama tim dan seluruh anggota sudah benar.
- [ ] Screenshot cadangan disiapkan bila demo langsung gagal.
