# Berkas Submission — Siap Tempel

## 1. Judul Karya

```
LATMA SIBER — Platform Latihan dan Pengukuran Kesiapan Siber Satuan
```

## 2. Deskripsi Ide (versi pendek, ±120 kata — untuk form pendaftaran)

```
Pertahanan siber TNI AD tidak hanya membutuhkan teknologi, tetapi personel yang terlatih dan terukur. LATMA SIBER adalah platform latihan siber yang membangkitkan paket latihan secara otomatis: dari profil satuan, aktor ancaman, dan tingkat kesulitan, sistem menyusun topologi aset, skenario serangan dengan pemetaan MITRE ATT&CK, inject keputusan, rubrik enam kompetensi, serta buku panduan fasilitator dan peserta dalam Bahasa Indonesia.

Latihan dapat dijalankan dalam dua mode: tabletop tanpa infrastruktur — cocok untuk satuan dengan keterbatasan IT — dan lab terisolasi untuk latihan hands-on. Sistem menilai keputusan peserta secara langsung dan menghasilkan After Action Review berupa radar kompetensi per personel serta Indeks Kesiapan per satuan, sehingga PUSSIBERAD dapat memetakan kesiapan siber seluruh satuan secara berkelanjutan. Seluruh sistem berjalan on-premise dan dapat dioperasikan tanpa koneksi internet.

Kategori: Dukungan Teknologi (Core Infra).
```

## 3. Deskripsi Ide (versi panjang — untuk slide/deskripsi project)

```
MASALAH
Latihan siber di tingkat satuan masih mahal dan jarang dilakukan. Menyusun satu skenario yang layak membutuhkan berhari-hari kerja dan keahlian khusus, sementara hasilnya dinilai berdasarkan kesan fasilitator, bukan angka. Akibatnya pimpinan tidak memiliki gambaran kesiapan personel, dan kemampuan baru teruji ketika insiden nyata terjadi. Solusi yang ada umumnya berbasis cloud, sehingga sulit diterapkan pada satuan dengan koneksi terbatas dan data yang tidak boleh keluar.

SOLUSI
LATMA SIBER membalik pendekatan: bukan membangun alat deteksi baru, tetapi mesin yang mencetak dan mengukur operator. Tiga lapis:

1. Mesin Pembangkit — dari tiga input (profil satuan, aktor ancaman, tingkat kesulitan) sistem menghasilkan paket latihan lengkap: topologi aset dan zona, rantai serangan empat fase dengan pemetaan MITRE ATT&CK, 5–9 inject keputusan beserta opsi dan kunci, rubrik enam kompetensi, panduan fasilitator, daftar indikator ancaman, dan prasyarat pelaksanaan. Seluruhnya dalam Bahasa Indonesia dan dapat diekspor serta dicetak.

2. Mesin Pelaksana — dua mode. Mode tabletop berjalan tanpa jaringan sama sekali, cocok untuk satuan dengan keterbatasan infrastruktur. Mode lab menyediakan lingkungan terisolasi untuk latihan hands-on.

3. Mesin Penilaian — setiap keputusan dinilai pada enam kompetensi: deteksi, penahanan, pemulihan, forensik, pelaporan, dan komando. Keluarannya berupa Indeks Kesiapan 0–100, radar kompetensi, linimasa keputusan beserta kunci jawaban, dan rekomendasi latihan berikutnya. Agregasi lintas satuan ditampilkan sebagai peta kesiapan.

DAMPAK
Waktu menyusun skenario: 3 hari kerja menjadi 4 detik. Biaya pelaksanaan: dari puluhan juta rupiah menjadi nol. Persiapan fasilitator: 1–2 minggu menjadi 45 menit. Penilaian: dari kesan menjadi indeks yang dapat dibandingkan antar-waktu dan antar-satuan.

KELAYAKAN
Berjalan di satu laptop atau mini-PC satuan, tanpa dependensi eksternal dan tanpa internet. Tersedia versi statis yang berjalan penuh di peramban. Roadmap adopsi tiga fase: pilot lima satuan (0–3 bulan), papan kesiapan pusat (3–9 bulan), lab terisolasi dan sertifikasi kompetensi personel (9–18 bulan).
```

## 4. Kategori

```
Dukungan Teknologi (Core Infra)
```

## 5. Teknologi

```
Node.js (tanpa dependensi eksternal) · Vanilla JavaScript · SVG · Docker (mode lab, rancangan)
```

## 6. Tautan yang Disubmit

| Item | Isi |
|---|---|
| Link karya | `https://<akun>.github.io/latma-siber/` (versi statis, langsung dapat dijalankan di peramban) |
| Repositori | `https://github.com/<akun>/latma-siber` |
| Video presentasi | `<link YouTube unlisted>` |
| Slide penjelasan | `LATMA-SIBER-Deck.pdf` (10 halaman) |

## 7. Checklist Submission

- [ ] Link karya dapat dibuka tanpa login, di peramban apa pun.
- [ ] Link karya diuji di jendela penyamaran (incognito) — bukan hanya di peramban sendiri.
- [ ] Video presentasi: akses "siapa saja yang memiliki link", durasi ≤ 3 menit.
- [ ] Slide PDF terunggah dan dapat diunduh.
- [ ] Deskripsi ide sudah ditempel di halaman submission CODEPOLITAN.
- [ ] Nama tim dan seluruh anggota sudah benar.
- [ ] Screenshot cadangan disiapkan bila demo langsung gagal.
