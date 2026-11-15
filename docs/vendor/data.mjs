// LATMA SIBER — basis data profil satuan & aktor ancaman
// Semua nama domain/IP/hash bersifat fiktif dan hanya untuk keperluan latihan.

export const KOMPETENSI = [
  { id: 'deteksi',     nama: 'Deteksi',        bobot: 20, deskripsi: 'Kemampuan menemukan jejak serangan lebih awal' },
  { id: 'containment', nama: 'Penahanan',      bobot: 20, deskripsi: 'Isolasi dan pembatasan dampak insiden' },
  { id: 'eradikasi',   nama: 'Pemulihan',      bobot: 15, deskripsi: 'Pembersihan ancaman dan pemulihan layanan' },
  { id: 'forensik',    nama: 'Forensik',       bobot: 15, deskripsi: 'Pengumpulan dan pengamanan barang bukti digital' },
  { id: 'pelaporan',   nama: 'Pelaporan',      bobot: 15, deskripsi: 'Dokumentasi, eskalasi, dan pelaporan resmi' },
  { id: 'komando',     nama: 'Komando',        bobot: 15, deskripsi: 'Pengambilan keputusan, koordinasi, dan disiplin prosedur' }
];

export const LEVEL = {
  dasar:    { nama: 'Dasar',    menit: 90,  inject: 5, personel: '4–6', warna: '#5ce08a' },
  menengah: { nama: 'Menengah', menit: 150, inject: 7, personel: '5–8', warna: '#e0b355' },
  lanjut:   { nama: 'Lanjut',   menit: 240, inject: 9, personel: '6–10', warna: '#ff7a5c' }
};

export const SATUAN = [
  {
    id: 'poslog', nama: 'Pos Logistik', jenis: 'Satuan Perbekalan', personel: 42,
    lokasi: 'Bekasi, Jawa Barat', misi: 'Mendukung distribusi perbekalan dan material satuan jajaran',
    host: 'PC-ADM-01', srv: 'SRV-INVENTORI', edge: 'RT-EDGE-01', ot: 'TIMBANGAN-DIGITAL-01',
    kritis: ['Data stok dan pengadaan', 'Sistem inventori gudang', 'Jalur distribusi'],
    paparan: ['Akses internet terbatas 20 Mbps', 'Akun admin dipakai bersama 3 orang', 'Tidak ada EDR, hanya antivirus bawaan'],
    catatan: 'Personel TI: 2 orang. Jam operasional 07.00–16.00, gudang dijaga 24 jam.'
  },
  {
    id: 'yonif', nama: 'Batalyon Infanteri', jenis: 'Satuan Tempur', personel: 620,
    lokasi: 'Cianjur, Jawa Barat', misi: 'Satuan manuver dengan tiga kompi dan unsur pendukung',
    host: 'PC-STAF-01', srv: 'SRV-DOKUMEN', edge: 'RT-EDGE-YONIF', ot: 'GCS-DRONE-01',
    kritis: ['Dokumen rencana operasi', 'Data personel', 'Komunikasi komando'],
    paparan: ['WiFi komando terbuka untuk tamu', 'Laptop dinas dibawa pulang personel', 'USB dipakai lintas kompi'],
    catatan: 'Personel TI: 3 orang. Markas terpisah 3 kompi di lokasi berbeda.'
  },
  {
    id: 'denhub', nama: 'Detasemen Perhubungan', jenis: 'Satuan Pendukung Komunikasi', personel: 85,
    lokasi: 'Bandung, Jawa Barat', misi: 'Menyelenggarakan jaringan komunikasi dan data satuan',
    host: 'PC-NOC-01', srv: 'SRV-VOIP', edge: 'RT-CORE-DENHUB', ot: 'VSAT-MODEM-01',
    kritis: ['Jaringan backbone satuan', 'Layanan telepon VoIP', 'Tautan satelit'],
    paparan: ['Perangkat jaringan dikelola bergiliran 24/7', 'Kredensial perangkat default belum diganti', 'Log hanya disimpan 7 hari'],
    catatan: 'Personel TI: 14 orang. Ini satuan paling teknis — nilai lebih tinggi untuk kualitas respons.'
  },
  {
    id: 'gudmun', nama: 'Gudang Munisi', jenis: 'Instalasi Kritis', personel: 60,
    lokasi: 'Subang, Jawa Barat', misi: 'Penyimpanan dan pemeliharaan munisi serta bahan peledak',
    host: 'PC-LOGISTIK-02', srv: 'SRV-MONITORING', edge: 'RT-EDGE-GUDMUN', ot: 'PLC-GENSET-01',
    kritis: ['Kendali suhu dan kelembapan', 'Sistem kelistrikan cadangan', 'Pencatatan keluar-masuk munisi'],
    paparan: ['Jaringan IT dan OT berbagi switch yang sama', 'PLC memakai kata sandi bawaan pabrik', 'Tidak ada segmentasi VLAN'],
    catatan: 'Personel TI: 1 orang. Zona terbatas, akses fisik berlapis.'
  },
  {
    id: 'mabes', nama: 'Staf Mabes', jenis: 'Unsur Staf Pusat', personel: 240,
    lokasi: 'Jakarta Pusat', misi: 'Perencanaan, administrasi, dan pengendalian satuan jajaran',
    host: 'PC-PIMPINAN-01', srv: 'SRV-EMAIL', edge: 'VPN-GW-MABES', ot: null,
    kritis: ['Email dinas', 'Arsip kebijakan', 'Domain dan akun terpusat'],
    paparan: ['Portal web publik pada alamat yang sama', 'Domain Controller tunggal', 'Banyak akun tanpa MFA'],
    catatan: 'Personel TI: 9 orang. Target utama serangan bernuansa politik dan intelijen.'
  },
  {
    id: 'rumkit', nama: 'Rumah Sakit TNI AD', jenis: 'Fasilitas Kesehatan', personel: 310,
    lokasi: 'Jakarta Timur', misi: 'Pelayanan kesehatan prajurit dan keluarga',
    host: 'PC-PENDAFTARAN-01', srv: 'SRV-DB-SIMRS', edge: 'RT-EDGE-RUMKIT', ot: 'PACS-RADIOLOGI',
    kritis: ['Rekam medis elektronik', 'Layanan IGD', 'Sistem antrean dan farmasi'],
    paparan: ['SIMRS versi lama tanpa pembaruan', 'Banyak perangkat medis berbasis Windows 7', 'Vendor luar akses remote tanpa jadwal'],
    catatan: 'Personel TI: 6 orang. Layanan 24 jam, toleransi gangguan sangat rendah.'
  },
  {
    id: 'koramil', nama: 'Koramil Teritorial', jenis: 'Satuan Kewilayahan', personel: 18,
    lokasi: 'Cianjur, Jawa Barat', misi: 'Pembinaan teritorial dan komunikasi sosial',
    host: 'PC-BABINSA-01', srv: null, edge: 'RT-EDGE-KORAMIL', ot: null,
    kritis: ['Data wilayah binaan', 'Komunikasi dengan desa', 'Laporan teritorial'],
    paparan: ['Internet rumahan tanpa firewall', 'Satu PC dipakai bergantian', 'Tidak ada personel TI khusus'],
    catatan: 'Personel TI: 0. Semua bergantung pada bantuan Denhub setempat.'
  },
  {
    id: 'denma', nama: 'Detasemen Markas', jenis: 'Unsur Pelayanan Markas', personel: 150,
    lokasi: 'Bandung, Jawa Barat', misi: 'Pelayanan administrasi, keuangan, dan keamanan markas',
    host: 'PC-KEUANGAN-01', srv: 'SRV-FILE-DENMA', edge: 'RT-EDGE-DENMA', ot: 'CCTV-NVR-01',
    kritis: ['Data keuangan dan gaji', 'Administrasi personel', 'Pengawasan CCTV markas'],
    paparan: ['Folder keuangan dibagi ke seluruh LAN', 'CCTV satu jaringan dengan kantor', 'Backup mingguan ke hard disk lepas'],
    catatan: 'Personel TI: 4 orang. Nilai tinggi pada kerapian prosedur dan pelaporan.'
  }
];

// Skor: deteksi, containment, eradikasi, forensik, pelaporan, komando
const S = (d = 0, c = 0, e = 0, f = 0, p = 0, k = 0) => ({ deteksi: d, containment: c, eradikasi: e, forensik: f, pelaporan: p, komando: k });

export const AKTOR = [
  {
    id: 'ransomware',
    nama: 'RANSOM-93',
    jenis: 'Ransomware Kriminal',
    asal: 'Kelompok kriminal berbayar, bergerak cepat',
    motivasi: 'Pemerasan finansial',
    kemampuan: 'Sedang',
    ciri: 'Menyasar server file dan cadangan, menuntut tebusan dalam 72 jam',
    killchain: [
      { fase: 'Akses Awal', teknik: [{ id: 'T1566.002', nama: 'Spearphishing Link' }, { id: 'T1078', nama: 'Valid Accounts' }], indikator: ['Email "tagihan pengadaan" dari domain mirip', 'Login VPN di luar jam dinas'] },
      { fase: 'Eksekusi', teknik: [{ id: 'T1204.002', nama: 'Malicious File' }, { id: 'T1059.001', nama: 'PowerShell' }], indikator: ['powershell -enc pada PC admin', 'File .lnk di folder berbagi'] },
      { fase: 'Pemetaan', teknik: [{ id: 'T1046', nama: 'Network Service Discovery' }, { id: 'T1021.002', nama: 'SMB/Windows Admin Shares' }], indikator: ['Scan SMB 445 internal', 'Akses admin$ dari PC non-admin'] },
      { fase: 'Dampak', teknik: [{ id: 'T1486', nama: 'Data Encrypted for Impact' }, { id: 'T1490', nama: 'Inhibit System Recovery' }], indikator: ['Ekstensi .r93 pada file', 'vssadmin delete shadows'] }
    ],
    injects: [
      { kanal: 'Telepon', judul: 'Laporan staf: file tidak bisa dibuka',
        narasi: 'Pukul 08.10 staf administrasi menelepon. Seluruh file di folder berbagi pada {SRV} berubah nama dengan akhiran .r93 dan tidak bisa dibuka. Di layar muncul catatan tebusan berbahasa Indonesia dengan hitungan waktu 72 jam.',
        pertanyaan: 'Apa dua tindakan pertama yang Anda perintahkan?',
        opsi: [
          { teks: 'Putuskan tautan jaringan server file dan matikan akses berbagi', skor: S(2, 10, 2, 1, 3, 5), baik: true, umpan: 'Benar. Isolasi segera membatasi penyebaran ke PC lain.' },
          { teks: 'Minta staf mematikan PC masing-masing dan mencabut kabel LAN', skor: S(2, 7, 1, 1, 2, 3), baik: true, umpan: 'Cukup baik, tetapi tanpa koordinasi bisa menghapus bukti di memori.' },
          { teks: 'Restart server untuk melihat apakah masalah hilang', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Restart mempercepat enkripsi dan menghapus jejak memori.' },
          { teks: 'Hubungi nomor pada catatan tebusan untuk menegosiasi', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Ini melanggar prosedur dan membuka jalur komunikasi dengan pelaku.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Trafik SMB masif antar-PC',
        narasi: 'Sensor jaringan mencatat lonjakan koneksi SMB (port 445) dari {HOST} ke enam PC lain dalam dua menit. Pola ini tidak pernah terjadi sebelumnya.',
        pertanyaan: 'Apa yang Anda lakukan dengan temuan ini?',
        opsi: [
          { teks: 'Blokir SMB antar-workstation di firewall dan catat sumbernya', skor: S(8, 8, 2, 3, 4, 4), baik: true, umpan: 'Tepat. Deteksi dini plus penahanan langsung di titik penyebaran.' },
          { teks: 'Laporkan ke atasan lalu tunggu instruksi', skor: S(4, 0, 0, 1, 6, 2), baik: false, umpan: 'Setengah benar. Pelaporan penting, tetapi penundaan memberi pelaku waktu.' },
          { teks: 'Matikan seluruh jaringan satuan', skor: S(3, 6, 0, 0, 2, 1), baik: false, umpan: 'Terlalu agresif. Menghentikan seluruh operasi tanpa dasar yang cukup.' },
          { teks: 'Abaikan karena trafik internal dianggap normal', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini justru sinyal penyebaran lateral paling jelas.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Cadangan ikut terenkripsi',
        narasi: 'Staf melaporkan NAS cadangan mingguan juga terkena enkripsi. Ternyata NAS selalu terpasang (mounted) di server file sepanjang hari.',
        pertanyaan: 'Langkah pemulihan mana yang paling tepat?',
        opsi: [
          { teks: 'Amankan salinan cadangan off-site/offline yang belum terpasang, verifikasi integritasnya', skor: S(3, 4, 10, 4, 5, 5), baik: true, umpan: 'Tepat. Cadangan offline adalah satu-satunya jalur pemulihan yang bersih.' },
          { teks: 'Format NAS lalu mulai dari nol', skor: S(0, 2, 3, 0, 2, 1), baik: false, umpan: 'Merugikan. Menghapus potensi bukti dan data yang masih bisa diselamatkan.' },
          { teks: 'Bayar tebusan agar cepat selesai', skor: S(0, 0, 1, 0, 0, 0), baik: false, umpan: 'Salah. Tidak menjamin pemulihan dan mendanai kejahatan.' },
          { teks: 'Pulihkan dari cadangan yang sama setelah server dibersihkan', skor: S(1, 3, 4, 2, 3, 2), baik: false, umpan: 'Berisiko. Cadangan itu sudah tersentuh enkripsi dan bisa membawa sisa ancaman.' }
        ] },
      { kanal: 'Email', judul: 'Email "konfirmasi tagihan pengadaan"',
        narasi: 'Ditemukan email masuk ke {HOST} dari domain mirip mitra resmi, berisi tautan ke berkas "INVOICE-PENGADAAN.pdf.exe". Tiga penerima membuka lampiran.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Blokir domain pengirim, tarik email dari semua kotak, periksa tiga penerima', skor: S(7, 7, 5, 4, 5, 4), baik: true, umpan: 'Tepat. Tindakan menyeluruh: cegah penyebaran, bersihkan, dan telusuri korban.' },
          { teks: 'Hanya hapus email di kotak yang melapor', skor: S(2, 2, 1, 0, 2, 1), baik: false, umpan: 'Kurang. Email yang sama masih ada di kotak lain.' },
          { teks: 'Kirim peringatan umum ke grup WhatsApp tanpa tindakan teknis', skor: S(1, 0, 0, 0, 4, 3), baik: false, umpan: 'Sosialisasi bagus, tetapi akar masalah tidak ditangani.' },
          { teks: 'Blokir seluruh akses email keluar-masuk satuan', skor: S(2, 3, 0, 0, 2, 1), baik: false, umpan: 'Berlebihan. Menghentikan komunikasi dinas tanpa kebutuhan.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Penghapusan shadow copy',
        narasi: 'Log proses mencatat eksekusi vssadmin delete shadows /all /quiet pada {SRV} pukul 08.07, tiga menit sebelum enkripsi terdeteksi.',
        pertanyaan: 'Apa nilai forensik dari temuan ini dan tindak lanjutnya?',
        opsi: [
          { teks: 'Simpan log dan image memori, jadikan dasar analisis linimasa, lalu telusuri akun pelaku', skor: S(6, 3, 3, 10, 6, 4), baik: true, umpan: 'Tepat. Ini bukti kunci untuk menentukan jalur masuk dan akun yang disalahgunakan.' },
          { teks: 'Hapus log lama agar tidak memenuhi penyimpanan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Menghapus barang bukti dan melemahkan penyelidikan.' },
          { teks: 'Cukup catat di buku jaga harian', skor: S(2, 0, 0, 1, 4, 2), baik: false, umpan: 'Tidak cukup. Bukti digital butuh pengamanan dan rantai pengawasan.' },
          { teks: 'Rekonstruksi dari ingatan staf saja', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Kesaksian tanpa bukti teknis tidak dapat dipertanggungjawabkan.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Tekanan pimpinan untuk cepat normal',
        narasi: 'Pimpinan meminta layanan kembali normal dalam 4 jam karena ada kunjungan atasan. Tim baru menyelesaikan isolasi dan belum melakukan verifikasi kebersihan sistem.',
        pertanyaan: 'Bagaimana Anda menyikapi tekanan ini?',
        opsi: [
          { teks: 'Sampaikan risiko tertulis, usulkan pemulihan bertahap pada layanan non-kritis lebih dulu', skor: S(3, 6, 5, 2, 8, 10), baik: true, umpan: 'Tepat. Komando yang baik = berani menyampaikan risiko dengan solusi, bukan menolak atau menyerah.' },
          { teks: 'Turuti permintaan dan nyalakan semua layanan sekarang', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Berbahaya. Sistem yang belum bersih berisiko terinfeksi ulang saat acara.' },
          { teks: 'Tolak tanpa penjelasan dan lanjutkan pekerjaan', skor: S(1, 3, 3, 0, 2, 3), baik: false, umpan: 'Kurang. Penolakan tanpa komunikasi merusak kepercayaan komando.' },
          { teks: 'Serahkan keputusan sepenuhnya ke pimpinan', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Perwira siber wajib memberi rekomendasi teknis, bukan melepas tanggung jawab.' }
        ] }
    ]
  },
  {
    id: 'apt',
    nama: 'APT-KERIS',
    jenis: 'Aktor Intelijen Negara',
    asal: 'Kelompok lanjutan dengan sumber daya besar, bergerak lambat',
    motivasi: 'Espionase dokumen rencana dan data personel',
    kemampuan: 'Tinggi',
    ciri: 'Diam berbulan-bulan, memakai akun sah, menyasar dokumen pimpinan',
    killchain: [
      { fase: 'Akses Awal', teknik: [{ id: 'T1566.001', nama: 'Spearphishing Attachment' }, { id: 'T1190', nama: 'Exploit Public-Facing Application' }], indikator: ['Dokumen .docm bertema undangan rapat', 'Permintaan aneh pada portal web publik'] },
      { fase: 'Persistence', teknik: [{ id: 'T1543.003', nama: 'Windows Service' }, { id: 'T1053.005', nama: 'Scheduled Task' }], indikator: ['Service baru bernama mirip pembaruan', 'Task harian pukul 02.00'] },
      { fase: 'Pengumpulan', teknik: [{ id: 'T1005', nama: 'Data from Local System' }, { id: 'T1039', nama: 'Data from Network Shared Drive' }], indikator: ['Akses massal folder rencana', 'Arsip .rar baru di folder temp'] },
      { fase: 'Eksfiltrasi', teknik: [{ id: 'T1041', nama: 'Exfiltration Over C2 Channel' }, { id: 'T1567.002', nama: 'Exfiltration to Cloud Storage' }], indikator: ['Upload 1,8 GB ke layanan awan', 'Koneksi malam ke IP luar'] }
    ],
    injects: [
      { kanal: 'Email', judul: 'Undangan rapat dari alamat mirip',
        narasi: 'Staf pimpinan menerima email "Undangan Rapat Koordinasi" dengan lampiran .docm. Pengirim memakai nama pejabat yang dikenal, tetapi alamat domainnya berbeda satu huruf.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Verifikasi melalui kanal terpisah, karantina lampiran, periksa makro, dan cek penerima lain', skor: S(9, 6, 4, 5, 6, 5), baik: true, umpan: 'Tepat. Verifikasi kanal ganda adalah pertahanan terbaik terhadap penipuan identitas.' },
          { teks: 'Teruskan ke seluruh staf sebagai informasi rapat', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Fatal. Anda menyebarkan ancaman ke seluruh satuan.' },
          { teks: 'Balas email untuk menanyakan keasliannya', skor: S(1, 0, 0, 1, 2, 1), baik: false, umpan: 'Berisiko. Balasan dikirim ke pelaku, bukan ke pejabat asli.' },
          { teks: 'Hapus email dan anggap selesai', skor: S(3, 1, 1, 0, 1, 0), baik: false, umpan: 'Kurang. Bukti hilang dan penerima lain tidak terlindungi.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Service baru bernama mirip pembaruan',
        narasi: 'Pada {HOST} muncul service "WinUpdateSvc" dengan path di folder AppData, berjalan sebagai SYSTEM. Namanya mirip layanan pembaruan resmi, tetapi lokasinya tidak lazim.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Isolasi host, ambil image disk, analisis service dan akun pemasangnya', skor: S(9, 7, 4, 9, 5, 5), baik: true, umpan: 'Tepat. Ini indikasi persistence kuat; bukti harus diamankan sebelum dibersihkan.' },
          { teks: 'Hentikan service dan hapus langsung', skor: S(4, 5, 5, 1, 3, 2), baik: false, umpan: 'Setengah benar. Membersihkan tanpa bukti menghilangkan peluang mengetahui jalur masuk.' },
          { teks: 'Biarkan karena namanya mirip pembaruan resmi', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Penamaan mirip adalah teknik penyamaran yang lazim.' },
          { teks: 'Restart seluruh server agar service hilang', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Service persisten akan kembali berjalan.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Akses massal ke folder rencana',
        narasi: 'Log server mencatat akun seorang staf membuka 340 dokumen rencana dalam 12 menit pada pukul 02.40. Staf tersebut sedang cuti di luar kota.',
        pertanyaan: 'Apa interpretasi dan tindakan Anda?',
        opsi: [
          { teks: 'Anggap akun disalahgunakan: nonaktifkan sesi, ganti kredensial, lacak sumber koneksi', skor: S(9, 8, 3, 6, 6, 5), baik: true, umpan: 'Tepat. Pola akses tidak wajar pada jam tidak wajar = kompromi akun.' },
          { teks: 'Hubungi staf untuk memastikan, lalu tunggu jawaban', skor: S(4, 1, 0, 1, 4, 2), baik: false, umpan: 'Terlalu lambat. Setiap menit tambahan memperbesar kebocoran.' },
          { teks: 'Ubah kata sandi saja', skor: S(3, 4, 1, 1, 3, 2), baik: false, umpan: 'Kurang. Sesi aktif dan mekanisme persistence belum dicabut.' },
          { teks: 'Anggap staf bekerja lembur dari luar', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini asumsi yang mengabaikan indikasi kuat penyalahgunaan.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Upload 1,8 GB ke layanan awan',
        narasi: 'Trafik keluar malam ini mencapai 1,8 GB ke layanan penyimpanan awan, dari {HOST}, melalui koneksi terenkripsi.',
        pertanyaan: 'Tindakan prioritas?',
        opsi: [
          { teks: 'Putus koneksi host, blokir tujuan, hitung cakupan data yang keluar, laporkan sebagai kebocoran', skor: S(8, 8, 3, 5, 9, 6), baik: true, umpan: 'Tepat. Kebocoran data wajib dilaporkan resmi, bukan diselesaikan diam-diam.' },
          { teks: 'Biarkan sampai selesai agar tahu file apa yang diambil', skor: S(3, 0, 0, 3, 1, 0), baik: false, umpan: 'Salah. Anda membiarkan data keluar demi rasa penasaran.' },
          { teks: 'Hanya blokir layanan awan tersebut di firewall', skor: S(3, 5, 1, 0, 2, 1), baik: false, umpan: 'Kurang. Host tetap terinfeksi dan bisa memakai jalur lain.' },
          { teks: 'Matikan seluruh internet satuan', skor: S(2, 5, 0, 0, 3, 2), baik: false, umpan: 'Berlebihan dan mengganggu operasi tanpa analisis cakupan.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Arsip .rar misterius',
        narasi: 'Ditemukan arsip "arsip-2026.rar" 900 MB di folder temp {SRV}, dibuat pukul 02.15. Isinya dokumen rencana yang disalin dari beberapa folder.',
        pertanyaan: 'Apa yang Anda lakukan?',
        opsi: [
          { teks: 'Amankan sebagai bukti dengan hash, jangan ubah isinya, analisis metadata dan asal proses', skor: S(5, 3, 2, 10, 6, 4), baik: true, umpan: 'Tepat. Ini bukti staging eksfiltrasi; integritasnya harus dijaga.' },
          { teks: 'Hapus agar tidak membebani penyimpanan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Anda menghapus bukti utama.' },
          { teks: 'Buka isinya untuk melihat lalu tutup', skor: S(2, 0, 0, 1, 1, 0), baik: false, umpan: 'Berisiko. Membuka arsip mengubah metadata dan bisa memicu muatan.' },
          { teks: 'Serahkan ke staf TI lain tanpa catatan', skor: S(1, 0, 0, 2, 1, 1), baik: false, umpan: 'Kurang. Tanpa rantai pengawasan, bukti kehilangan nilai.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Permintaan laporan ke PUSSIBERAD',
        narasi: 'Insiden belum tuntas, tetapi atasan meminta laporan resmi ke PUSSIBERAD hari ini juga.',
        pertanyaan: 'Apa isi laporan yang tepat?',
        opsi: [
          { teks: 'Laporan awal terstruktur: kronologi, dampak sementara, tindakan, kebutuhan dukungan, jadwal pembaruan', skor: S(3, 2, 2, 4, 10, 8), baik: true, umpan: 'Tepat. Laporan awal bukan laporan akhir; kejelasan dan kejujuran yang dinilai.' },
          { teks: 'Tunggu sampai semuanya tuntas baru lapor', skor: S(0, 0, 0, 0, 2, 1), baik: false, umpan: 'Salah. Keterlambatan melaporkan insiden siber adalah pelanggaran prosedur.' },
          { teks: 'Laporkan hanya bagian yang berhasil ditangani', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Laporan yang menyelewengkan fakta membahayakan keputusan pimpinan.' },
          { teks: 'Minta staf menulis laporan tanpa data teknis', skor: S(0, 0, 0, 2, 3, 2), baik: false, umpan: 'Kurang. Laporan tanpa bukti teknis sulit ditindaklanjuti.' }
        ] }
    ]
  },
  {
    id: 'insider',
    nama: 'INSIDER-LOG',
    jenis: 'Ancaman Dalam',
    asal: 'Personel atau tenaga kontrak dengan akses sah',
    motivasi: 'Keuntungan pribadi / ketidakpuasan',
    kemampuan: 'Rendah–Sedang',
    ciri: 'Memakai akun sendiri, menyalahgunakan wewenang, sulit dibedakan dari pekerjaan normal',
    killchain: [
      { fase: 'Pengintaian', teknik: [{ id: 'T1087', nama: 'Account Discovery' }, { id: 'T1082', nama: 'System Information Discovery' }], indikator: ['Membuka daftar akun dan folder di luar tugas', 'Akses malam hari'] },
      { fase: 'Pengumpulan', teknik: [{ id: 'T1005', nama: 'Data from Local System' }, { id: 'T1119', nama: 'Automated Collection' }], indikator: ['Penyalinan massal ke USB', 'Arsip di folder pribadi'] },
      { fase: 'Eksfiltrasi', teknik: [{ id: 'T1052.001', nama: 'Exfiltration over USB' }, { id: 'T1567.002', nama: 'Exfiltration to Cloud Storage' }], indikator: ['USB terpasang 40 menit', 'Upload ke akun pribadi'] },
      { fase: 'Penghapusan Jejak', teknik: [{ id: 'T1070.004', nama: 'File Deletion' }, { id: 'T1222', nama: 'File and Directory Permissions Modification' }], indikator: ['Log akses folder dihapus', 'Izin folder diubah'] }
    ],
    injects: [
      { kanal: 'Laporan Staf', judul: 'Penyalinan data di luar jam dinas',
        narasi: 'Petugas jaga melaporkan seorang staf masuk ruang server pukul 21.30 dan menyalin file ke hard disk eksternal. Yang bersangkutan memiliki izin akses ruangan.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Dokumentasikan, amankan bukti akses, laporkan ke atasan dan unsur pengawasan personel', skor: S(7, 6, 2, 7, 9, 8), baik: true, umpan: 'Tepat. Ancaman dalam ditangani lewat prosedur, bukan tindakan sepihak.' },
          { teks: 'Konfrontasi langsung saat itu juga', skor: S(2, 2, 0, 1, 2, 2), baik: false, umpan: 'Berisiko. Konfrontasi tanpa dasar prosedur bisa merusak penyelidikan.' },
          { teks: 'Diamkan karena dia punya izin akses', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Izin akses bukan izin menyalin data.' },
          { teks: 'Cabut semua akses seluruh staf', skor: S(1, 4, 0, 0, 2, 1), baik: false, umpan: 'Berlebihan dan menghambat satuan tanpa sebab.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'USB terpasang 40 menit',
        narasi: 'Log endpoint mencatat perangkat USB mass storage terpasang pada {HOST} selama 40 menit, di luar jam kerja, dengan 2.100 file tersalin.',
        pertanyaan: 'Langkah Anda?',
        opsi: [
          { teks: 'Kunci perangkat, ambil log dan metadata, cocokkan dengan hak akses pengguna', skor: S(8, 6, 2, 8, 6, 5), baik: true, umpan: 'Tepat. Korelasi log endpoint dan hak akses adalah kunci kasus insider.' },
          { teks: 'Nonaktifkan port USB di seluruh satuan', skor: S(2, 5, 1, 0, 2, 2), baik: false, umpan: 'Tidak proporsional. Kebijakan menyeluruh butuh keputusan pimpinan.' },
          { teks: 'Hapus log untuk menjaga privasi staf', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Menghapus bukti justru melindungi pelaku.' },
          { teks: 'Tunggu kejadian berikutnya sebagai pembanding', skor: S(2, 0, 0, 1, 1, 0), baik: false, umpan: 'Salah. Membiarkan potensi kebocoran berlanjut.' }
        ] },
      { kanal: 'Email', judul: 'Email data ke akun pribadi',
        narasi: 'Sistem email menandai pengiriman dari akun dinas ke alamat pribadi berisi lampiran daftar personel dan nomor kontak.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Tahan email, catat bukti, koordinasikan dengan atasan dan pengawasan internal', skor: S(7, 7, 2, 6, 8, 7), baik: true, umpan: 'Tepat. Tahan dulu, jangan langsung hapus — bukti dan prosedur sejalan.' },
          { teks: 'Hapus email agar tidak keluar', skor: S(2, 4, 2, 0, 1, 1), baik: false, umpan: 'Kurang. Bukti hilang dan pola pengiriman sebelumnya tidak terungkap.' },
          { teks: 'Umumkan nama pelaku di grup satuan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Menjatuhkan vonis sendiri melanggar prosedur dan hukum.' },
          { teks: 'Biarkan karena data personel bukan rahasia', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Data personel tetap dilindungi.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Izin akses berlebih',
        narasi: 'Ditemukan 12 akun memiliki akses ke folder keuangan padahal tugasnya tidak memerlukan. Sebagian akun milik personel yang sudah mutasi.',
        pertanyaan: 'Apa rekomendasi Anda?',
        opsi: [
          { teks: 'Audit hak akses, cabut yang tidak perlu, terapkan prinsip akses minimum dan tinjauan berkala', skor: S(6, 7, 4, 3, 7, 8), baik: true, umpan: 'Tepat. Ini perbaikan struktural yang mencegah kasus berulang.' },
          { teks: 'Biarkan karena tidak ada insiden', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini utang keamanan yang menunggu waktu.' },
          { teks: 'Hapus seluruh akun yang tidak dikenal', skor: S(2, 4, 2, 0, 2, 1), baik: false, umpan: 'Berisiko. Tanpa audit, akun sah bisa ikut terhapus.' },
          { teks: 'Serahkan ke vendor tanpa dokumentasi', skor: S(0, 1, 0, 0, 2, 1), baik: false, umpan: 'Kurang. Tanpa catatan, perubahan tidak dapat dipertanggungjawabkan.' }
        ] },
      { kanal: 'Telepon', judul: 'Ancaman dari oknum internal',
        narasi: 'Seorang staf melapor menerima pesan dari rekan kerja yang mengancam akan menyebarkan data internal bila tidak diberi keuntungan tertentu.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Amankan bukti pesan, lindungi pelapor, eskalasi ke atasan dan aparat berwenang', skor: S(3, 4, 1, 8, 10, 9), baik: true, umpan: 'Tepat. Ini sudah ranah hukum dan perlindungan personel.' },
          { teks: 'Selesaikan secara kekeluargaan di tingkat satuan', skor: S(1, 2, 0, 2, 2, 2), baik: false, umpan: 'Kurang. Pemerasan bukan urusan internal semata.' },
          { teks: 'Minta pelapor mengalah agar situasi tenang', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini membiarkan pemerasan berlanjut.' },
          { teks: 'Sebar pesan itu ke grup untuk mencari dukungan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Melanggar kerahasiaan dan merugikan pelapor.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Folder izin berubah',
        narasi: 'Izin folder arsip pada {SRV} diubah sehingga semua pengguna domain dapat membaca. Perubahan dilakukan pukul 22.10 dari akun administrator.',
        pertanyaan: 'Tindakan Anda?',
        opsi: [
          { teks: 'Kembalikan izin, audit perubahan, telusuri akun dan sesi yang dipakai', skor: S(7, 7, 3, 7, 6, 6), baik: true, umpan: 'Tepat. Perubahan izin adalah sinyal kuat penyalahgunaan wewenang.' },
          { teks: 'Biarkan agar staf mudah mengakses', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini membuka data ke seluruh jaringan.' },
          { teks: 'Hapus folder dan buat ulang', skor: S(1, 2, 1, 0, 1, 1), baik: false, umpan: 'Merusak bukti dan berisiko kehilangan data.' },
          { teks: 'Ganti kata sandi administrator saja', skor: S(2, 3, 1, 1, 2, 2), baik: false, umpan: 'Kurang. Perubahan izin dan sesi aktif belum ditangani.' }
        ] }
    ]
  },
  {
    id: 'supplychain',
    nama: 'SUPPLY-VENDOR',
    jenis: 'Kompromi Rantai Pasok',
    asal: 'Vendor perangkat lunak atau teknisi pihak ketiga',
    motivasi: 'Akses tidak sah melalui kepercayaan vendor',
    kemampuan: 'Sedang–Tinggi',
    ciri: 'Masuk lewat pembaruan resmi atau akses remote vendor yang sah',
    killchain: [
      { fase: 'Akses Awal', teknik: [{ id: 'T1195.002', nama: 'Compromise Software Supply Chain' }, { id: 'T1133', nama: 'External Remote Services' }], indikator: ['Pembaruan dari domain vendor', 'Sesi remote di luar jadwal'] },
      { fase: 'Persistence', teknik: [{ id: 'T1547.001', nama: 'Registry Run Keys' }, { id: 'T1136.001', nama: 'Local Account' }], indikator: ['Autostart baru setelah update', 'Akun lokal bernama mirip layanan'] },
      { fase: 'Pemetaan', teknik: [{ id: 'T1018', nama: 'Remote System Discovery' }, { id: 'T1021.001', nama: 'RDP' }], indikator: ['RDP dari segmen vendor', 'Pemindaian host internal'] },
      { fase: 'Dampak', teknik: [{ id: 'T1489', nama: 'Service Stop' }, { id: 'T1486', nama: 'Data Encrypted for Impact' }], indikator: ['Layanan berhenti serentak', 'Enkripsi pada host tertentu'] }
    ],
    injects: [
      { kanal: 'Laporan Staf', judul: 'Pembaruan aplikasi dari vendor',
        narasi: 'Vendor mengirim paket pembaruan aplikasi inventori melalui tautan unduhan. Teknisi vendor meminta akses remote untuk memasangnya sore ini.',
        pertanyaan: 'Apa yang Anda lakukan sebelum memberi akses?',
        opsi: [
          { teks: 'Verifikasi paket (hash dan tanda tangan), jadwalkan akses, batasi sesi dan rekam aktivitasnya', skor: S(8, 7, 4, 6, 6, 7), baik: true, umpan: 'Tepat. Vendor tetap pihak ketiga yang harus diawasi, bukan dipercaya penuh.' },
          { teks: 'Berikan akses administrator penuh agar cepat selesai', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Berbahaya. Ini pintu masuk paling sering dipakai serangan rantai pasok.' },
          { teks: 'Tolak semua akses vendor selamanya', skor: S(1, 2, 0, 0, 2, 2), baik: false, umpan: 'Tidak praktis. Vendor tetap dibutuhkan; yang perlu adalah pengawasan.' },
          { teks: 'Minta vendor mengirim file lewat WhatsApp', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Kanal tidak resmi menghilangkan jejak dan integritas paket.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Sesi remote di luar jadwal',
        narasi: 'Sesi remote ke {SRV} dibuka pukul 01.20 dari akun vendor, padahal jadwal pemeliharaan hanya siang hari.',
        pertanyaan: 'Tindakan Anda?',
        opsi: [
          { teks: 'Putus sesi, blokir akun vendor sementara, periksa perubahan yang dilakukan', skor: S(8, 8, 3, 6, 6, 5), baik: true, umpan: 'Tepat. Akses di luar jadwal adalah anomali yang harus dihentikan segera.' },
          { teks: 'Catat saja untuk laporan bulanan', skor: S(2, 0, 0, 1, 3, 1), baik: false, umpan: 'Terlalu pasif untuk akses istimewa.' },
          { teks: 'Matikan server agar sesi terputus', skor: S(1, 4, 0, 1, 1, 1), baik: false, umpan: 'Menghentikan layanan dan berpotensi merusak data.' },
          { teks: 'Hubungi vendor besok pagi', skor: S(1, 0, 0, 0, 2, 1), baik: false, umpan: 'Terlalu lambat. Sesi masih berjalan malam ini.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Akun lokal baru bernama mirip layanan',
        narasi: 'Setelah pembaruan, muncul akun lokal "svc_backup2" dengan hak administrator. Tidak ada tiket perubahan yang mendokumentasikannya.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Nonaktifkan akun, telusuri kapan dan oleh proses apa dibuat, bandingkan dengan paket vendor', skor: S(8, 7, 3, 8, 6, 5), baik: true, umpan: 'Tepat. Akun tak terdokumentasi pasca-pembaruan adalah indikasi kompromi rantai pasok.' },
          { teks: 'Biarkan karena mungkin bagian dari pembaruan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Tanpa dokumentasi, akun itu tidak sah.' },
          { teks: 'Hapus akun tanpa mencatat apa pun', skor: S(3, 5, 3, 1, 2, 2), baik: false, umpan: 'Kurang. Bukti asal-usul akun hilang.' },
          { teks: 'Ganti nama akun agar rapi', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Salah. Kosmetik, bukan penanganan.' }
        ] },
      { kanal: 'Telepon', judul: 'Layanan berhenti serentak',
        narasi: 'Tiga layanan pada {SRV} berhenti bersamaan pukul 02.05. Staf melaporkan aplikasi inventori tidak dapat diakses seluruh satuan.',
        pertanyaan: 'Urutan tindakan yang tepat?',
        opsi: [
          { teks: 'Pastikan apakah penghentian disengaja, isolasi host, pulihkan dari citra bersih, lalu audit', skor: S(6, 7, 8, 4, 5, 6), baik: true, umpan: 'Tepat. Urutan: pahami, isolasi, pulihkan, audit.' },
          { teks: 'Nyalakan ulang layanan berulang kali', skor: S(0, 1, 1, 0, 1, 0), baik: false, umpan: 'Salah. Jika ancaman masih ada, layanan akan berhenti lagi.' },
          { teks: 'Tunggu vendor memperbaiki', skor: S(1, 0, 0, 0, 2, 1), baik: false, umpan: 'Kurang. Ketergantungan penuh pada vendor memperpanjang gangguan.' },
          { teks: 'Pulihkan dari cadangan tanpa memeriksa penyebab', skor: S(1, 3, 5, 1, 2, 2), baik: false, umpan: 'Berisiko. Penyebab belum diketahui, pemulihan bisa terulang.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Kontrak vendor tanpa klausul keamanan',
        narasi: 'Ditemukan kontrak pemeliharaan vendor tanpa kewajiban pelaporan insiden, tanpa batas akses, dan tanpa audit.',
        pertanyaan: 'Apa rekomendasi Anda?',
        opsi: [
          { teks: 'Susun klausul keamanan: batas akses, pelaporan insiden, audit, dan sanksi', skor: S(4, 6, 3, 3, 9, 8), baik: true, umpan: 'Tepat. Ini perbaikan tata kelola yang berdampak jangka panjang.' },
          { teks: 'Akhiri kontrak segera', skor: S(0, 2, 0, 0, 2, 2), baik: false, umpan: 'Tidak realistis dan bisa mengganggu layanan.' },
          { teks: 'Biarkan karena kontrak sudah berjalan', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Risiko tetap ada sampai kontrak diperbaiki.' },
          { teks: 'Minta vendor menandatangani surat pernyataan saja', skor: S(1, 2, 0, 0, 4, 3), baik: false, umpan: 'Kurang. Tanpa mekanisme audit, pernyataan sulit ditegakkan.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Pemindaian dari segmen vendor',
        narasi: 'Sensor mencatat pemindaian port dari segmen jaringan vendor ke 40 host internal dalam 5 menit.',
        pertanyaan: 'Tindakan Anda?',
        opsi: [
          { teks: 'Putus rute segmen vendor, blokir, dan periksa host yang menjadi tujuan pemindaian', skor: S(8, 8, 3, 5, 5, 5), baik: true, umpan: 'Tepat. Segmen pihak ketiga harus terisolasi dan dipantau ketat.' },
          { teks: 'Abaikan karena vendor sedang bekerja', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Pemindaian internal bukan pekerjaan pemeliharaan normal.' },
          { teks: 'Matikan semua switch', skor: S(1, 4, 0, 0, 1, 1), baik: false, umpan: 'Berlebihan dan menghentikan operasi.' },
          { teks: 'Kirim email teguran ke vendor', skor: S(1, 1, 0, 0, 3, 2), baik: false, umpan: 'Tidak cukup. Aktivitas aktif harus dihentikan lebih dulu.' }
        ] }
    ]
  },
  {
    id: 'psyops',
    nama: 'OPSINFO-27',
    jenis: 'Operasi Informasi',
    asal: 'Jaringan akun terkoordinasi di media sosial dan pesan instan',
    motivasi: 'Menggoyahkan kepercayaan dan memicu kepanikan',
    kemampuan: 'Sedang',
    ciri: 'Narasi seragam, akun baru, penyebaran lintas platform, memakai nama satuan',
    killchain: [
      { fase: 'Persiapan', teknik: [{ id: 'T1585.002', nama: 'Email Accounts' }, { id: 'T1583.001', nama: 'Domains' }], indikator: ['Akun baru serentak', 'Domain mirip situs resmi'] },
      { fase: 'Penyamaran', teknik: [{ id: 'T1656', nama: 'Impersonation' }], indikator: ['Mengaku anggota satuan', 'Memakai logo dan nama resmi'] },
      { fase: 'Penyebaran', teknik: [{ id: 'T1585', nama: 'Establish Accounts' }], indikator: ['Unggahan serentak 20+ akun', 'Narasi identik berbeda kata'] },
      { fase: 'Amplifikasi', teknik: [{ id: 'T1584', nama: 'Compromise Infrastructure' }], indikator: ['Dishare akun populer', 'Masuk grup WhatsApp satuan'] }
    ],
    injects: [
      { kanal: 'Media Sosial', judul: 'Akun mengaku anggota satuan',
        narasi: 'Muncul akun baru mengatasnamakan {SATUAN}, mengunggah klaim insiden dan foto yang mirip lingkungan markas. Unggahan dibagikan 400 kali dalam 3 jam.',
        pertanyaan: 'Apa langkah pertama Anda?',
        opsi: [
          { teks: 'Verifikasi ke pejabat penerangan, dokumentasikan unggahan, koordinasikan klarifikasi resmi', skor: S(7, 5, 2, 6, 10, 9), baik: true, umpan: 'Tepat. Operasi informasi dilawan dengan verifikasi dan klarifikasi resmi, bukan emosi.' },
          { teks: 'Balas dengan akun pribadi dan bantah keras', skor: S(1, 1, 0, 0, 3, 1), baik: false, umpan: 'Berisiko. Akun pribadi memperluas jangkauan dan melemahkan otoritas.' },
          { teks: 'Abaikan karena hanya media sosial', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Narasi yang dibiarkan menjadi kebenaran di mata publik.' },
          { teks: 'Laporkan akun massal tanpa dokumentasi', skor: S(3, 3, 1, 1, 3, 2), baik: false, umpan: 'Kurang. Tanpa dokumentasi, pola koordinasi tidak terlihat.' }
        ] },
      { kanal: 'WhatsApp Grup', judul: 'Pesan berantai di grup satuan',
        narasi: 'Pesan berantai masuk ke grup WhatsApp personel: "Gaji dipotong untuk alutsista, sebar ke semua." Pesan memakai tangkapan layar surat tanpa nomor dan tanpa tanda tangan.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Identifikasi sumber, minta klarifikasi resmi dari bagian administrasi, edarkan penjelasan resmi', skor: S(6, 6, 2, 5, 9, 8), baik: true, umpan: 'Tepat. Sumber dan klarifikasi resmi menghentikan rantai hoaks.' },
          { teks: 'Hapus pesan dan keluarkan pengirim dari grup', skor: S(2, 3, 1, 2, 2, 2), baik: false, umpan: 'Kurang. Hoaks sudah tersebar; sumbernya juga belum tentu pelaku utama.' },
          { teks: 'Diamkan sampai ramai sendiri', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Diam dianggap pembenaran.' },
          { teks: 'Sebar tangkapan layar lain sebagai bantahan', skor: S(1, 1, 0, 0, 2, 1), baik: false, umpan: 'Berisiko. Bantahan tanpa otoritas resmi menambah kebingungan.' }
        ] },
      { kanal: 'Media Sosial', judul: 'Pola akun terkoordinasi',
        narasi: 'Analisis awal menemukan 23 akun membuat unggahan serupa dalam 40 menit, dengan nama berpola dan foto profil dari sumber stok yang sama.',
        pertanyaan: 'Apa yang Anda lakukan dengan temuan ini?',
        opsi: [
          { teks: 'Susun laporan analisis jaringan akun, simpan bukti, eskalasi ke unsur terkait', skor: S(9, 4, 2, 8, 9, 7), baik: true, umpan: 'Tepat. Bukti pola koordinasi jauh lebih kuat daripada tuduhan umum.' },
          { teks: 'Umumkan daftar akun palsu ke publik', skor: S(2, 2, 0, 1, 3, 2), baik: false, umpan: 'Berisiko. Bisa memicu perang narasi dan salah sasaran.' },
          { teks: 'Cukup blokir akun satu per satu', skor: S(2, 3, 1, 0, 1, 1), baik: false, umpan: 'Tidak efektif. Akun pengganti akan muncul.' },
          { teks: 'Tunggu sampai ada dampak nyata', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Peringatan dini justru inti dari pemantauan ruang siber.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Personel jadi sasaran percakapan',
        narasi: 'Beberapa personel melapor dihubungi akun asing yang menanyakan kesiapan satuan dan jadwal kegiatan dengan dalih survei.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Hentikan komunikasi, kumpulkan bukti, beri panduan kepada seluruh personel', skor: S(7, 7, 3, 6, 8, 7), baik: true, umpan: 'Tepat. Personel adalah sensor pertama; mereka perlu panduan, bukan larangan saja.' },
          { teks: 'Larang semua personel memakai media sosial', skor: S(0, 2, 0, 0, 2, 2), baik: false, umpan: 'Tidak realistis dan sulit ditegakkan.' },
          { teks: 'Minta personel membalas untuk menyelidiki sendiri', skor: S(2, 0, 0, 2, 1, 1), baik: false, umpan: 'Berisiko. Personel tanpa pelatihan bisa membocorkan informasi.' },
          { teks: 'Anggap survei biasa', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Pertanyaan tentang kesiapan satuan adalah indikasi pengintaian.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Permintaan klarifikasi publik',
        narasi: 'Pimpinan meminta klarifikasi disiarkan hari ini, tetapi verifikasi fakta belum selesai dan satu data masih simpang siur.',
        pertanyaan: 'Apa yang Anda sarankan?',
        opsi: [
          { teks: 'Klarifikasi bertahap: sampaikan yang sudah terverifikasi, akui yang masih didalami, jadwalkan pembaruan', skor: S(3, 4, 2, 4, 10, 9), baik: true, umpan: 'Tepat. Kredibilitas dibangun dari kejujuran bertahap, bukan klaim sempurna.' },
          { teks: 'Tunda semua klarifikasi sampai lengkap', skor: S(1, 1, 0, 1, 3, 2), baik: false, umpan: 'Kurang. Kekosongan informasi diisi narasi pelaku.' },
          { teks: 'Sangkal semua tuduhan', skor: S(0, 0, 0, 0, 1, 0), baik: false, umpan: 'Berisiko. Jika satu tuduhan terbukti, seluruh kredibilitas jatuh.' },
          { teks: 'Serahkan sepenuhnya ke humas tanpa data teknis', skor: S(1, 1, 0, 0, 4, 3), baik: false, umpan: 'Kurang. Klarifikasi tanpa dasar teknis mudah dipatahkan.' }
        ] },
      { kanal: 'Media Sosial', judul: 'Situs mirip halaman resmi',
        narasi: 'Ditemukan situs dengan nama mirip domain resmi satuan, meminta pengunjung memasukkan nomor induk dan kata sandi untuk "pendaftaran ulang".',
        pertanyaan: 'Tindakan Anda?',
        opsi: [
          { teks: 'Dokumentasikan, ajukan takedown, blokir domain, peringatkan personel yang mungkin sudah mengisi', skor: S(8, 7, 4, 6, 7, 6), baik: true, umpan: 'Tepat. Ini penipuan kredensial, bukan sekadar hoaks.' },
          { teks: 'Isi formulir untuk melihat apa yang terjadi', skor: S(2, 0, 0, 1, 1, 0), baik: false, umpan: 'Berisiko. Anda menyerahkan kredensial ke pelaku.' },
          { teks: 'Cukup umumkan di grup internal', skor: S(3, 3, 1, 0, 4, 3), baik: false, umpan: 'Kurang. Domain tetap aktif dan korban terus berjatuhan.' },
          { teks: 'Tunggu ada korban dulu', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Pencegahan justru inti tugas.' }
        ] }
    ]
  },
  {
    id: 'usb',
    nama: 'MEDIA-BAWAN',
    jenis: 'Ancaman Media Lepas',
    asal: 'Penyusup fisik atau personel tidak sadar',
    motivasi: 'Menembus jaringan terisolasi (air-gap)',
    kemampuan: 'Sedang',
    ciri: 'USB ditemukan, file .lnk menyamar, penyebaran lewat folder berbagi',
    killchain: [
      { fase: 'Akses Awal', teknik: [{ id: 'T1200', nama: 'Hardware Additions' }, { id: 'T1091', nama: 'Replication Through Removable Media' }], indikator: ['USB asing ditemukan', 'File autorun/.lnk baru'] },
      { fase: 'Eksekusi', teknik: [{ id: 'T1204.002', nama: 'Malicious File' }, { id: 'T1059.005', nama: 'Visual Basic' }], indikator: ['Skrip .vbs di folder dokumen', 'Proses induk explorer.exe mencurigakan'] },
      { fase: 'Penyebaran', teknik: [{ id: 'T1021.002', nama: 'SMB/Windows Admin Shares' }, { id: 'T1570', nama: 'Lateral Tool Transfer' }], indikator: ['File baru di share semua PC', 'Koneksi 445 antar-PC'] },
      { fase: 'Pengumpulan', teknik: [{ id: 'T1005', nama: 'Data from Local System' }, { id: 'T1052.001', nama: 'Exfiltration over USB' }], indikator: ['Penyalinan dokumen ke USB', 'Akses folder arsip malam hari'] }
    ],
    injects: [
      { kanal: 'Laporan Staf', judul: 'USB ditemukan di area parkir',
        narasi: 'Petugas menemukan USB bertuliskan "DATA LATIHAN 2026" di area parkir markas. Seorang staf mencoba mencolokkannya ke {HOST} untuk melihat isinya.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Hentikan, jangan colok ke sistem operasional, analisis di komputer terisolasi', skor: S(9, 7, 3, 7, 6, 7), baik: true, umpan: 'Tepat. Media asing hanya boleh disentuh di lingkungan analisis terisolasi.' },
          { teks: 'Colokkan ke PC staf untuk melihat isi', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Ini persis skenario yang diinginkan penyerang.' },
          { teks: 'Simpan di laci untuk diserahkan besok', skor: S(1, 1, 0, 1, 3, 2), baik: false, umpan: 'Kurang. Rantai pengawasan bukti tidak terjaga.' },
          { teks: 'Format USB lalu pakai untuk keperluan dinas', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Menghancurkan bukti dan berisiko.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'File .lnk baru di folder berbagi',
        narasi: 'Muncul 60 file .lnk bernama "Dokumen Penting" di folder berbagi {SRV}. Setiap file menunjuk ke skrip .vbs di folder temp.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Isolasi server, nonaktifkan tautan berbagi, kumpulkan sampel dengan hash, bersihkan menyeluruh', skor: S(9, 8, 5, 8, 5, 5), baik: true, umpan: 'Tepat. Ini penyebaran aktif melalui media lepas; kecepatan menentukan.' },
          { teks: 'Hapus file .lnk satu per satu', skor: S(3, 2, 2, 1, 2, 1), baik: false, umpan: 'Kurang. Skrip .vbs dan mekanisme penyebaran masih ada.' },
          { teks: 'Matikan server tanpa mengumpulkan sampel', skor: S(2, 5, 1, 0, 2, 1), baik: false, umpan: 'Kehilangan peluang analisis dan bukti.' },
          { teks: 'Umumkan agar staf tidak membuka file', skor: S(2, 2, 0, 0, 4, 3), baik: false, umpan: 'Perlu, tetapi bukan penanganan teknis.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Dokumen hilang dari arsip',
        narasi: 'Beberapa dokumen arsip pada {SRV} tidak dapat ditemukan. Log menunjukkan penyalinan ke media lepas pukul 23.40.',
        pertanyaan: 'Apa tindakan Anda?',
        opsi: [
          { teks: 'Amankan log, identifikasi perangkat dan pengguna, periksa apakah data keluar dari markas', skor: S(7, 6, 2, 9, 7, 6), baik: true, umpan: 'Tepat. Ini dugaan eksfiltrasi fisik; bukti dan kronologi adalah kunci.' },
          { teks: 'Pulihkan dari cadangan lalu anggap selesai', skor: S(2, 2, 3, 0, 1, 1), baik: false, umpan: 'Salah. Data tetap bocor dan pelaku masih bebas.' },
          { teks: 'Tanya semua staf siapa yang mengambil', skor: S(2, 1, 0, 2, 3, 2), baik: false, umpan: 'Kurang. Tanpa bukti teknis, tuduhan bisa salah sasaran.' },
          { teks: 'Ganti kunci ruang arsip saja', skor: S(0, 2, 0, 0, 1, 1), baik: false, umpan: 'Tidak cukup. Jalur digitalnya belum ditutup.' }
        ] },
      { kanal: 'Telepon', judul: 'PC melambat dan antivirus mati',
        narasi: 'Lima PC di {SATUAN} melaporkan antivirus tidak aktif dan proses tidak dikenal berjalan. Tidak ada pembaruan yang dijadwalkan.',
        pertanyaan: 'Apa langkah Anda?',
        opsi: [
          { teks: 'Isolasi PC terdampak, periksa autostart dan proses, cari sumber penyebaran bersama', skor: S(7, 7, 5, 6, 5, 5), baik: true, umpan: 'Tepat. Pola serentak menandakan sumber penyebaran bersama, bukan gangguan acak.' },
          { teks: 'Install ulang satu PC lalu kembali bekerja', skor: S(1, 2, 2, 0, 1, 1), baik: false, umpan: 'Kurang. Sumber penyebaran tidak ditemukan.' },
          { teks: 'Nyalakan ulang antivirus berulang kali', skor: S(1, 0, 0, 0, 1, 0), baik: false, umpan: 'Sia-sia jika ada mekanisme yang mematikannya.' },
          { teks: 'Abaikan karena PC masih bisa dipakai', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Antivirus mati adalah indikator kuat kompromi.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Kebijakan media lepas',
        narasi: 'Satuan belum memiliki aturan penggunaan USB. Personel memakai USB pribadi untuk memindahkan dokumen dinas.',
        pertanyaan: 'Apa rekomendasi Anda?',
        opsi: [
          { teks: 'Terapkan kebijakan media resmi: media terdaftar, pemindaian wajib, larangan USB pribadi, sanksi jelas', skor: S(6, 7, 4, 3, 8, 9), baik: true, umpan: 'Tepat. Teknologi tanpa kebijakan tidak akan bertahan.' },
          { teks: 'Larang total semua perpindahan data', skor: S(1, 2, 0, 0, 2, 2), baik: false, umpan: 'Tidak realistis; akan dilanggar diam-diam.' },
          { teks: 'Cukup pasang pengumuman di dinding', skor: S(1, 1, 0, 0, 3, 2), baik: false, umpan: 'Kurang. Tanpa mekanisme dan sanksi, pengumuman tidak efektif.' },
          { teks: 'Serahkan ke kebijakan pusat tanpa usulan', skor: S(0, 0, 0, 0, 2, 1), baik: false, umpan: 'Kurang. Satuan tetap butuh aturan operasional sendiri.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Skrip .vbs di folder temp',
        narasi: 'Ditemukan skrip .vbs terobfuskasi di folder temp pada tiga PC. Skrip dijalankan oleh explorer.exe saat pengguna membuka file .lnk.',
        pertanyaan: 'Apa yang Anda lakukan?',
        opsi: [
          { teks: 'Ambil sampel, analisis perilaku di sandbox terisolasi, blokir indikatornya di seluruh endpoint', skor: S(8, 6, 5, 8, 4, 4), baik: true, umpan: 'Tepat. Analisis dulu, lalu sebarkan indikator untuk pencegahan menyeluruh.' },
          { teks: 'Buka skrip dengan Notepad untuk membaca isinya', skor: S(3, 0, 0, 1, 1, 0), baik: false, umpan: 'Cukup aman dibaca, tetapi tanpa analisis perilaku Anda tidak tahu dampaknya.' },
          { teks: 'Hapus semua file .vbs di seluruh PC', skor: S(3, 4, 3, 0, 1, 1), baik: false, umpan: 'Bisa merusak skrip sah dan menghilangkan bukti.' },
          { teks: 'Matikan fitur Windows Script Host di semua PC tanpa uji', skor: S(2, 5, 2, 0, 2, 1), baik: false, umpan: 'Langkah pengerasan yang baik, tetapi berisiko mengganggu aplikasi dinas.' }
        ] }
    ]
  },
  {
    id: 'ddos',
    nama: 'BOTNET-NUSANTARA',
    jenis: 'Serangan Ketersediaan',
    asal: 'Botnet komersial yang disewa',
    motivasi: 'Melumpuhkan layanan publik satuan',
    kemampuan: 'Rendah',
    ciri: 'Lonjakan trafik masif, pola berulang, menargetkan layanan yang terlihat publik',
    killchain: [
      { fase: 'Pengintaian', teknik: [{ id: 'T1595', nama: 'Active Scanning' }], indikator: ['Pemindaian port pada IP publik', 'Permintaan aneh ke halaman login'] },
      { fase: 'Serangan', teknik: [{ id: 'T1498.001', nama: 'Direct Network Flood' }], indikator: ['Trafik 800 Mbps masuk', 'Ribuan koneksi setengah terbuka'] },
      { fase: 'Dampak', teknik: [{ id: 'T1499', nama: 'Endpoint DoS' }], indikator: ['CPU server 100%', 'Layanan tidak merespons'] }
    ],
    injects: [
      { kanal: 'Telepon', judul: 'Layanan tidak bisa diakses',
        narasi: 'Pukul 09.00 staf melaporkan situs informasi satuan tidak dapat dibuka. Grafik trafik pada {EDGE} melonjak dari 20 Mbps menjadi 780 Mbps dalam lima menit.',
        pertanyaan: 'Apa dua tindakan pertama Anda?',
        opsi: [
          { teks: 'Aktifkan mitigasi di tepi jaringan, blokir pola trafik, dan laporkan ke penyedia layanan', skor: S(7, 8, 3, 3, 7, 6), baik: true, umpan: 'Tepat. Mitigasi di tepi plus koordinasi penyedia adalah jalur tercepat.' },
          { teks: 'Matikan seluruh koneksi internet satuan', skor: S(3, 4, 1, 0, 3, 2), baik: false, umpan: 'Berlebihan. Anda menghentikan layanan lain yang tidak terdampak.' },
          { teks: 'Restart server web berulang kali', skor: S(1, 1, 0, 0, 1, 0), baik: false, umpan: 'Tidak menyelesaikan sumber banjir trafik.' },
          { teks: 'Tunggu sampai trafik turun sendiri', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Serangan bisa berlangsung berjam-jam.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'Pola trafik berulang dari banyak IP',
        narasi: 'Trafik berasal dari 4.000 alamat IP dengan pola permintaan identik setiap 2 detik. Sebagian besar berada di luar negeri.',
        pertanyaan: 'Apa yang Anda lakukan dengan data ini?',
        opsi: [
          { teks: 'Terapkan pembatasan laju dan tantangan, simpan sampel log untuk analisis pola', skor: S(8, 7, 2, 5, 5, 4), baik: true, umpan: 'Tepat. Rate limit menyelamatkan layanan, log menyelamatkan analisis.' },
          { teks: 'Blokir semua IP asing permanen', skor: S(3, 4, 1, 0, 2, 2), baik: false, umpan: 'Berisiko. Bisa memblokir pengguna sah dan mitra luar negeri.' },
          { teks: 'Hapus log karena terlalu besar', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Log adalah bukti serangan.' },
          { teks: 'Ganti alamat IP layanan tanpa memberi tahu', skor: S(1, 3, 1, 0, 2, 1), baik: false, umpan: 'Sementara membantu, tetapi tanpa mitigasi pola serangan berulang.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Layanan publik vs keamanan',
        narasi: 'Situs informasi satuan memang untuk publik, tetapi dihosting pada server yang sama dengan aplikasi internal.',
        pertanyaan: 'Apa rekomendasi Anda?',
        opsi: [
          { teks: 'Pisahkan hosting layanan publik dari jaringan internal dan terapkan segmentasi', skor: S(5, 8, 4, 3, 7, 8), baik: true, umpan: 'Tepat. Segmentasi mencegah gangguan publik merambat ke sistem internal.' },
          { teks: 'Matikan situs publik', skor: S(1, 2, 0, 0, 2, 2), baik: false, umpan: 'Menghilangkan fungsi informasi satuan.' },
          { teks: 'Biarkan karena situs publik tidak penting', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Reputasi satuan juga aset.' },
          { teks: 'Tambah bandwidth saja', skor: S(1, 3, 1, 0, 2, 1), baik: false, umpan: 'Hanya menaikkan biaya serangan, bukan menyelesaikan risiko.' }
        ] },
      { kanal: 'Laporan Staf', judul: 'Email palsu setelah serangan',
        narasi: 'Setelah serangan, beredar email mengaku dari penyedia layanan yang meminta kredensial admin untuk "pemulihan".',
        pertanyaan: 'Tindakan Anda?',
        opsi: [
          { teks: 'Verifikasi ke penyedia melalui kontak resmi, jangan berikan kredensial, blokir pengirim', skor: S(8, 7, 3, 5, 8, 7), baik: true, umpan: 'Tepat. Serangan kedua sering menyamar sebagai bantuan.' },
          { teks: 'Kirim kredensial agar layanan cepat pulih', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Fatal. Ini penyerahan akses langsung ke penyerang.' },
          { teks: 'Abaikan karena sedang sibuk', skor: S(1, 0, 0, 0, 1, 0), baik: false, umpan: 'Berisiko. Rekan lain bisa tertipu.' },
          { teks: 'Balas meminta bukti identitas lewat email yang sama', skor: S(2, 1, 0, 1, 2, 1), baik: false, umpan: 'Tidak sah. Verifikasi harus lewat kanal terpisah yang diketahui.' }
        ] },
      { kanal: 'Dashboard Monitoring', judul: 'CPU server 100%',
        narasi: 'Server web mencatat penggunaan CPU penuh dan 6.000 koneksi aktif. Aplikasi lain pada server itu ikut melambat.',
        pertanyaan: 'Langkah Anda?',
        opsi: [
          { teks: 'Batasi koneksi per IP, aktifkan cache, dan pisahkan proses aplikasi lain', skor: S(6, 8, 4, 2, 4, 4), baik: true, umpan: 'Tepat. Batasi beban, lindungi layanan lain.' },
          { teks: 'Naikkan spesifikasi server saat itu juga', skor: S(1, 3, 1, 0, 1, 1), baik: false, umpan: 'Tidak mungkin segera dan tidak menyelesaikan pola serangan.' },
          { teks: 'Matikan aplikasi lain agar server web lega', skor: S(1, 3, 0, 0, 1, 1), baik: false, umpan: 'Mengorbankan layanan dinas lain.' },
          { teks: 'Biarkan sampai serangan selesai', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Dampak bisa meluas ke data.' }
        ] },
      { kanal: 'Rapat Staf', judul: 'Laporan ke pimpinan dan publik',
        narasi: 'Pimpinan ingin tahu apakah insiden perlu diumumkan ke publik, sementara serangan masih berlangsung.',
        pertanyaan: 'Apa saran Anda?',
        opsi: [
          { teks: 'Sampaikan laporan internal lengkap, siapkan pernyataan publik singkat setelah mitigasi stabil', skor: S(3, 4, 2, 4, 9, 8), baik: true, umpan: 'Tepat. Urutan: kendalikan, verifikasi, komunikasikan.' },
          { teks: 'Umumkan detail teknis serangan sekarang', skor: S(2, 2, 0, 1, 3, 2), baik: false, umpan: 'Berisiko. Detail teknis bisa membantu penyerang berikutnya.' },
          { teks: 'Tidak perlu laporan karena hanya gangguan sementara', skor: S(0, 0, 0, 0, 0, 0), baik: false, umpan: 'Salah. Setiap gangguan layanan publik wajib tercatat.' },
          { teks: 'Serahkan seluruh komunikasi ke pihak lain', skor: S(1, 1, 0, 0, 3, 2), baik: false, umpan: 'Kurang. Perwira siber tetap sumber informasi teknis utama.' }
        ] }
    ]
  }
];

// Inject tambahan untuk level Lanjut (fokus komando, pelaporan, forensik)
export const INJECT_LANJUT = [
  { kanal: 'Rapat Staf', judul: 'Keputusan sulit: matikan layanan kritis',
    narasi: 'Analisis menunjukkan ancaman masih aktif pada {SRV}. Untuk membersihkan menyeluruh, layanan harus dimatikan 6 jam pada jam kerja.',
    pertanyaan: 'Apa keputusan Anda?',
    opsi: [
      { teks: 'Ajukan keputusan ke pimpinan dengan opsi, risiko, dan rencana komunikasi pengguna', skor: S(3, 5, 6, 2, 9, 10), baik: true, umpan: 'Tepat. Keputusan berdampak operasional harus melalui komando dengan opsi jelas.' },
      { teks: 'Matikan sendiri tanpa memberi tahu', skor: S(2, 5, 5, 0, 1, 1), baik: false, umpan: 'Salah. Melampaui kewenangan dan memicu kebingungan.' },
      { teks: 'Tunda pembersihan sampai akhir pekan', skor: S(1, 2, 1, 0, 3, 2), baik: false, umpan: 'Berisiko. Ancaman aktif selama berhari-hari.' },
      { teks: 'Biarkan layanan jalan sambil membersihkan sebagian', skor: S(2, 3, 2, 0, 2, 2), baik: false, umpan: 'Berisiko. Pembersihan separuh bisa meninggalkan persistence.' }
    ] },
  { kanal: 'Laporan Staf', judul: 'Permintaan barang bukti untuk penyelidikan',
    narasi: 'Unsur penyelidikan meminta salinan image disk dan log. Tim Anda masih membutuhkan perangkat tersebut untuk pemulihan.',
    pertanyaan: 'Bagaimana Anda menyeimbangkan keduanya?',
    opsi: [
      { teks: 'Buat salinan image dengan hash, serahkan salinan, simpan master dan catatan rantai pengawasan', skor: S(3, 3, 4, 10, 8, 7), baik: true, umpan: 'Tepat. Prinsipnya: satu master tersegel, salinan untuk bekerja.' },
      { teks: 'Serahkan perangkat asli segera', skor: S(1, 1, 2, 5, 5, 4), baik: false, umpan: 'Berisiko. Pemulihan terhenti dan integritas bukti bisa dipertanyakan.' },
      { teks: 'Tolak karena pemulihan lebih penting', skor: S(0, 1, 3, 2, 2, 2), baik: false, umpan: 'Salah. Kewajiban hukum tetap berlaku.' },
      { teks: 'Kirim tangkapan layar saja', skor: S(0, 0, 1, 1, 2, 1), baik: false, umpan: 'Tidak memadai sebagai barang bukti digital.' }
    ] },
  { kanal: 'Telepon', judul: 'Pesan dari satuan lain',
    narasi: 'Satuan lain melaporkan indikator serangan yang sama dan menanyakan apakah mereka harus memutus jaringan.',
    pertanyaan: 'Apa yang Anda sampaikan?',
    opsi: [
      { teks: 'Bagikan indikator yang sudah terverifikasi, sarankan tindakan bertahap, catat sebagai peringatan bersama', skor: S(5, 6, 3, 3, 8, 8), baik: true, umpan: 'Tepat. Berbagi indikator mempercepat pertahanan bersama tanpa menimbulkan kepanikan.' },
      { teks: 'Minta mereka menunggu instruksi pusat', skor: S(1, 1, 0, 0, 3, 3), baik: false, umpan: 'Terlalu pasif; satuan lain bisa terdampak lebih dulu.' },
      { teks: 'Bagikan seluruh detail teknis termasuk kerentanan yang belum ditambal', skor: S(2, 2, 0, 0, 3, 2), baik: false, umpan: 'Berisiko. Detail sensitif harus dibatasi.' },
      { teks: 'Tidak menjawab karena bukan kewenangan Anda', skor: S(0, 0, 0, 0, 1, 1), baik: false, umpan: 'Kurang. Koordinasi antar-satuan justru inti pertahanan siber.' }
    ] }
];
