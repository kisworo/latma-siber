# Naskah Presentasi Final — 10 menit

Alokasi: **9 menit presentasi + demo, 1 menit buffer**, lalu Q&A.
Aturan: satu ide per slide, jangan membaca slide. Angka selalu disebut.

---

### 0:00–0:40 · Pembuka (slide 1)
> "Selamat pagi. Nama saya [nama], dari [tim].
> Malam ini, di seluruh Indonesia, ada ribuan prajurit yang memegang telepon pintar dan laptop dinas. Sebagian dari mereka akan menjadi sasaran phishing, APK palsu, atau USB asing — dan tidak semua akan menyadarinya.
> Pertahanan siber kita tidak kekurangan alat. Yang kurang adalah prajurit yang pernah berlatih. Kami membangun mesin untuk mencetak dan mengukur prajurit itu: **LATMA SIBER**."

### 0:40–1:50 · Masalah (slide 2)
> "Tiga masalah, satu akar.
> Pertama, latihan terlalu mahal. Satu skenario yang layak butuh tiga hari kerja dan orang yang paham serangan. Akibatnya latihan jarang dilakukan — dan kemampuan personel baru teruji saat insiden nyata terjadi.
> Kedua, kesiapan tidak terukur. Tanpa penilaian terstruktur, pimpinan tidak punya angka untuk memutuskan siapa dilatih apa. Yang ada hanya kesan.
> Ketiga, hampir semua solusi latihan berbasis cloud. Di satuan, koneksi terbatas dan data tidak boleh keluar.
> Angka BSSN 2025: 5,2 miliar anomali, 93,78 persen terkait malware. Ancaman sudah terukur. Kesiapan kita belum."

### 1:50–2:30 · Insight (slide 3)
> "Di sini kami mengambil keputusan yang berbeda dari peserta lain.
> Semua orang membangun alat perang. Hampir tidak ada yang membangun pabrik prajurit.
> PUSSIBERAD sedang membangun kekuatan dari nol — jalur Bintara Siber, satuan baru, personel baru. Kebutuhan pertamanya bukan firewall tambahan, tapi cara mencetak dan mengukur operator, berulang, di seluruh satuan.
> Itu yang kami bangun."

### 2:30–3:30 · Solusi (slide 4)
> "Empat modul, satu alur.
> **Scenario Forge**: dari profil satuan, aktor ancaman, dan tingkat kesulitan, mesin menyusun topologi, rantai serangan yang dipetakan ke ATT&CK, inject keputusan, rubrik, dan panduan fasilitator.
> **Pelaksana**: dua mode. Tabletop tanpa jaringan sama sekali — ini penting, karena banyak satuan tidak punya lab. Dan lab terisolasi untuk latihan hands-on.
> **Penilaian**: enam kompetensi dinilai per keputusan, bukan di akhir.
> **Komando**: indeks kesiapan per personel dan heatmap per satuan.
> Hasilnya: dari profil satuan menjadi indeks kesiapan, dalam satu sesi."

### 3:30–6:30 · Demo langsung (slide 5–6)
*(Buka aplikasi. Jangan pakai slide. Bicara sambil klik.)*
> "Saya pilih Pos Logistik, aktor ransomware, tingkat menengah. Klik bangkitkan.
> — empat detik — dan ini paketnya: topologi enam node termasuk satu perangkat OT, rantai serangan empat fase dengan sembilan teknik ATT&CK, tujuh inject, rubrik enam kompetensi, panduan fasilitator, dan indikator ancaman.
> Sekarang saya jalankan. Saya beri nama tim. Inject pertama: staf melapor file tidak bisa dibuka dan ada catatan tebusan 72 jam. Saya pilih dua tindakan. Kirim.
> Papan skor bergerak. Perhatikan: yang dinilai bukan hanya 'benar atau salah', tapi kompetensi mana yang bergerak.
> Saya lanjut dua inject. Di sini tekanannya komando: pimpinan minta layanan normal dalam empat jam, sementara tim belum selesai verifikasi.
> Saya selesaikan. Ini hasilnya: indeks 80, cukup siap. Kuat di penahanan dan komando. Lemah di forensik dan pemulihan — karena tadi saya memilih mencatat di buku jaga, bukan mengamankan image memori.
> Sistem langsung memberi rekomendasi: standarkan pengambilan barang bukti, uji pemulihan dari cadangan offline.
> Ini yang tidak bisa dilakukan penilaian manual: satu sesi, enam kompetensi, angka yang bisa dibandingkan antar-waktu dan antar-satuan."

### 6:30–7:40 · Arsitektur & kedaulatan (slide 7)
> "Arsitekturnya sengaja sederhana. Satu perangkat, tiga lapis: pembangkit, pelaksana, penilai.
> Tidak ada panggilan API ke layanan luar. Server memakai modul bawaan Node — tanpa dependensi, tanpa build step. Ada versi statis yang berjalan penuh di peramban, bisa dibuka dari folder.
> Artinya: tidak ada data satuan yang keluar, tidak ada biaya langganan, dan tidak ada ketergantungan pada koneksi."

### 7:40–8:40 · Dampak & kelayakan (slide 8–9)
> "Angkanya: menyusun skenario dari tiga hari menjadi empat detik. Biaya pelaksanaan dari puluhan juta menjadi nol. Persiapan fasilitator dari satu-dua minggu menjadi 45 menit.
> Adopsinya bertahap. Fase satu: lima satuan percontohan, tabletop penuh, tanpa biaya perangkat. Fase dua: papan kesiapan pusat dan perpustakaan skenario bersama. Fase tiga: lab terisolasi dan sertifikasi kompetensi personel — terhubung dengan program Bintara Siber.
> Yang sudah berjalan hari ini: pembangkit paket, tabletop, penilaian, AAR, papan komando, ekspor dan cetak paket, mode offline."

### 8:40–9:20 · Penutup (slide 10)
> "Satu kalimat.
> Pertahanan siber tidak kekurangan alat. Ia kekurangan prajurit terlatih.
> LATMA SIBER mencetak dan mengukur prajurit itu — di satu laptop, tanpa internet, mulai minggu depan.
> Terima kasih."

### 9:20–10:00 · Buffer / transisi Q&A

---

## Antisipasi pertanyaan juri

**"Ini cuma kuis, bukan latihan siber sungguhan?"**
> "Tabletop adalah metode latihan yang dipakai militer dan industri — tanpa infrastruktur. Yang membedakan: inject-nya dibangkitkan dari profil satuan dan aktor nyata, keputusannya dinilai enam kompetensi, dan hasilnya dibandingkan antar-waktu. Mode lab terisolasi sudah dirancang untuk hands-on."

**"Skenarionya dari mana? Valid nggak?"**
> "Dirancang dari kerangka MITRE ATT&CK dan profil ancaman umum di Indonesia: ransomware, APT, insider, rantai pasok, operasi informasi, media lepas, DDoS. Setiap teknik punya ID yang bisa diaudit. Ke depan, skenario bisa ditandatangani dan dibagikan antar-satuan."

**"Kenapa tidak pakai AI cloud?"**
> "Karena di satuan tidak ada internet dan data tidak boleh keluar. Mesin pembangkitnya deterministik dan dapat diaudit — hasil sama untuk input sama. Itu lebih penting daripada keluaran yang berubah-ubah."

**"Bagaimana kalau personelnya tidak paham IT?"**
> "Justru sasaran utamanya. Level dasar tidak butuh prasyarat teknis, dan setiap opsi keputusan ditulis dalam bahasa operasional, bukan bahasa teknis."

**"Apa rencana setelah hackathon?"**
> "Pilot lima satuan dalam tiga bulan tanpa biaya perangkat, lalu papan kesiapan di tingkat pusat. Kami siap menyerahkan kode dan mendampingi instalasi."

## Checklist H-1 final

- [ ] Laptop terisi daya, mode pesawat untuk WiFi cadangan.
- [ ] Aplikasi dijalankan lokal (`npm start`), bukan mengandalkan internet venue.
- [ ] Data demo sudah bersih (satu sesi contoh), bukan data uji coba berantakan.
- [ ] Rekaman layar cadangan diputar kalau demo gagal.
- [ ] Deck PDF di dua tempat: laptop dan flashdisk.
