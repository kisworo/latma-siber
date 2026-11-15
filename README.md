# LATMA SIBER

**Platform latihan dan pengukuran kesiapan siber satuan.**
Berjalan on-premise, tanpa internet, tanpa cloud.

> Pertahanan siber tidak kekurangan alat. Ia kekurangan prajurit terlatih.

Kartika Cyber Hackathon 2026 — Kategori Dukungan Teknologi (Core Infra) / IT-OT.

---

## Masalah

1. **Latihan terlalu mahal.** Menyusun satu skenario latihan yang layak butuh berhari-hari dan keahlian khusus. Akibatnya latihan jarang dilakukan, dan kemampuan personel tidak teruji sampai insiden nyata terjadi.
2. **Kesiapan tidak terukur.** Tanpa penilaian terstruktur, pimpinan tidak punya angka untuk menentukan siapa perlu dilatih apa.
3. **Solusi butuh internet.** Hampir semua platform latihan berbasis cloud. Di banyak satuan, koneksi terbatas dan data tidak boleh keluar.

## Solusi

LATMA SIBER membangkitkan paket latihan siber lengkap dalam hitungan detik, menjalankannya dalam dua mode, lalu mengukur hasilnya dalam indeks kesiapan.

| Tahap | Yang dihasilkan |
|---|---|
| **Mesin Pembangkit** | Topologi aset, rantai serangan dengan pemetaan MITRE ATT&CK, inject keputusan, rubrik 6 kompetensi, panduan fasilitator, indikator ancaman |
| **Mesin Pelaksana** | Mode **tabletop** (tanpa jaringan sama sekali) dan mode **lab terisolasi** (Docker) |
| **Mesin Penilaian** | Skor per kompetensi, indeks kesiapan 0–100, radar, linimasa keputusan, rekomendasi latihan |

Enam kompetensi yang dinilai: **Deteksi, Penahanan, Pemulihan, Forensik, Pelaporan, Komando.**

## Menjalankan

### Mode server (Node.js ≥ 20, tanpa dependensi)

```bash
npm start
# buka http://localhost:4123
```

Tidak ada `npm install`. Tidak ada paket eksternal. Server hanya memakai modul bawaan Node.

### Mode statis (satu folder, bisa dibuka langsung)

```bash
node build-static.mjs
# hasil ada di docs/ — cukup serve folder itu
python3 -m http.server 4199 --directory docs
```

Pada mode statis, **seluruh mesin berjalan di peramban**. Data disimpan di `localStorage`. Cocok untuk demonstrasi di laptop yang tidak boleh terhubung jaringan.

### Mode lab (opsional)

Mode lab terisolasi disiapkan untuk pengembangan lanjutan menggunakan Docker pada satu host, tanpa akses internet. Purwarupa ini sudah memuat seluruh rancangan skenario dan rubrik untuk mode tersebut.

## Struktur

```
server.mjs              Server HTTP tanpa dependensi + API
src/data.mjs            8 profil satuan, 7 aktor ancaman, inject & opsi keputusan
src/generator.mjs       Mesin pembangkit paket + mesin penilaian (AAR)
src/dashboard.mjs       Agregasi kesiapan satuan
public/                 Antarmuka (vanilla JS, tanpa build step)
build-static.mjs        Build versi statis/offline (keluaran: docs/)
data/store.json         Penyimpanan lokal paket & sesi
```

## Alur pemakaian

1. **Pilih** profil satuan, aktor ancaman, dan tingkat kesulitan.
2. **Bangkitkan** paket latihan (± 4 detik).
3. **Jalankan** sesi: peserta memilih tindakan pada setiap inject, maksimal dua.
4. **Tinjau** after action review: indeks kesiapan, radar kompetensi, linimasa keputusan, rekomendasi.
5. **Bandingkan** kesiapan antar-satuan di papan komando.

## Kedaulatan data

- Tidak ada panggilan API ke layanan luar pada mode operasi normal.
- Paket latihan dapat diekspor (JSON) dan dicetak, sehingga dapat diarsipkan atau ditandatangani.
- Data sesi tersimpan lokal di perangkat satuan.
- Seluruh indikator ancaman bersifat fiktif dan hanya untuk keperluan latihan.

## Spesifikasi minimum

| Mode | Kebutuhan |
|---|---|
| Tabletop | 1 laptop, peramban modern, tanpa jaringan |
| Lab | 1 host Docker, 8 GB RAM, jaringan terisolasi |
| Penyimpanan | < 200 MB untuk 60 paket latihan |

## Roadmap adopsi

| Fase | Fokus |
|---|---|
| 0–3 bulan | Tabletop di 5 satuan percontohan, tanpa biaya perangkat |
| 3–9 bulan | Papan kesiapan tingkat pusat, perpustakaan skenario bersama |
| 9–18 bulan | Mode lab terisolasi, sertifikasi kompetensi personel |

## Kesesuaian kriteria penilaian

| Kriteria | Bobot | Pemenuhan |
|---|---|---|
| Relevansi & manfaat | 25% | Menjawab kebutuhan pembinaan personel siber dan pengukuran kesiapan satuan IT/OT |
| Inovasi teknis | 25% | Pembangkit skenario agentic yang menghasilkan paket latihan lengkap, bukan kuis statis |
| Fungsionalitas purwarupa | 25% | Alur utuh: bangkitkan → jalankan → nilai → laporkan |
| Kelayakan implementasi | 15% | Tanpa perangkat tambahan, tanpa internet, siap dipakai minggu pertama |
| Kualitas dokumentasi | 10% | Paket dapat diekspor & dicetak, panduan fasilitator lengkap, arsitektur terdokumentasi |

## Lisensi

Purwarupa untuk Kartika Cyber Hackathon 2026. Seluruh nama satuan, indikator, dan skenario bersifat simulasi.
