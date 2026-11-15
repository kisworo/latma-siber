import { SATUAN, AKTOR, LEVEL, KOMPETENSI, INJECT_LANJUT } from './data.mjs';
import { aturanUntuk } from './sigma.mjs';

const pad = (n) => String(n).padStart(2, '0');

function jamMulai() {
  return 8;
}

function jamInject(index, level) {
  const step = level === 'dasar' ? 12 : level === 'menengah' ? 18 : 24;
  const total = jamMulai() * 60 + 10 + index * step;
  return `${pad(Math.floor(total / 60))}.${pad(total % 60)}`;
}

function isiTeks(t, s) {
  return String(t)
    .replaceAll('{SRV}', s.srv || 'server berkas satuan')
    .replaceAll('{HOST}', s.host)
    .replaceAll('{EDGE}', s.edge)
    .replaceAll('{OT}', s.ot || 'perangkat operasional')
    .replaceAll('{SATUAN}', s.nama);
}

const IOC = {
  ransomware: [
    { tipe: 'Domain', nilai: 'cdn-pembaruan-klik[.]top', keterangan: 'Domain unduhan muatan tahap kedua' },
    { tipe: 'IP', nilai: '103.44.21[.]87', keterangan: 'Alamat kendali yang menghubungi host admin' },
    { tipe: 'SHA256', nilai: 'a3f1c9e0b7d2486c5e9a1f0d3b8c7e6a5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a', keterangan: 'Sampel pengenkripsi (fiktif)' },
    { tipe: 'Nama File', nilai: 'INVOICE-PENGADAAN.pdf.exe', keterangan: 'Lampiran email phishing' },
    { tipe: 'Proses', nilai: 'vssadmin delete shadows /all /quiet', keterangan: 'Penghapusan cadangan bayangan' }
  ],
  apt: [
    { tipe: 'Domain', nilai: 'rapat-koordinasi-ad[.]site', keterangan: 'Domain penyamaran undangan rapat' },
    { tipe: 'IP', nilai: '45.126.8[.]214', keterangan: 'Server kendali tahap lanjut' },
    { tipe: 'SHA256', nilai: 'b7e2d4a9c1f80b3e6d5a2c9f4b7e1d8a0c3f6b9e2d5a8c1f4b7e0d3a6c9f2b5e', keterangan: 'Dokumen ber makro (fiktif)' },
    { tipe: 'Service', nilai: 'WinUpdateSvc', keterangan: 'Layanan persisten di folder AppData' },
    { tipe: 'Scheduled Task', nilai: 'MicrosoftEdgeUpdateTaskMachineCore2', keterangan: 'Tugas terjadwal harian pukul 02.00' }
  ],
  insider: [
    { tipe: 'Akun', nilai: 'staf.logistik02', keterangan: 'Akun dengan akses di luar kewenangan' },
    { tipe: 'Perangkat', nilai: 'USB VID_0951 PID_1666', keterangan: 'Media lepas tidak terdaftar' },
    { tipe: 'Perilaku', nilai: '2.100 file tersalin dalam 40 menit', keterangan: 'Pola pengumpulan data' },
    { tipe: 'Folder', nilai: '\\\\SRV\\arsip\\keuangan', keterangan: 'Izin folder diubah menjadi semua pengguna' }
  ],
  supplychain: [
    { tipe: 'Domain', nilai: 'update-vendor-inventori[.]co', keterangan: 'Sumber paket pembaruan palsu' },
    { tipe: 'Akun', nilai: 'svc_backup2', keterangan: 'Akun lokal tak terdokumentasi' },
    { tipe: 'Sesi', nilai: 'RDP 01.20 WIB dari segmen vendor', keterangan: 'Akses di luar jadwal pemeliharaan' },
    { tipe: 'Hash Paket', nilai: '9c1f7a3e5d2b8c4f6a0e9d7c5b3a1f8e6d4c2b0a9f7e5d3c1b8a6f4e2d0c9b7a', keterangan: 'Paket pembaruan tidak cocok dengan hash resmi' }
  ],
  psyops: [
    { tipe: 'Akun', nilai: '23 akun terkoordinasi', keterangan: 'Dibuat dalam 6 hari terakhir, pola nama serupa' },
    { tipe: 'Domain', nilai: 'pendaftaran-ulang-satuan[.]id', keterangan: 'Situs penipuan kredensial' },
    { tipe: 'Narasi', nilai: '#GajiPrajuritDipotonq', keterangan: 'Tagar dengan ejaan dimanipulasi' },
    { tipe: 'Pola', nilai: '20 unggahan identik dalam 40 menit', keterangan: 'Indikasi perilaku terkoordinasi' }
  ],
  usb: [
    { tipe: 'Nama File', nilai: 'Dokumen Penting.lnk', keterangan: 'Pintasan palsu di folder berbagi' },
    { tipe: 'Skrip', nilai: '%TEMP%\\svc_update.vbs', keterangan: 'Skrip terobfuskasi yang dijalankan explorer.exe' },
    { tipe: 'USB', nilai: 'Label: DATA LATIHAN 2026', keterangan: 'Media ditemukan di area parkir' },
    { tipe: 'Perilaku', nilai: 'Penyalinan 60 file .lnk ke share', keterangan: 'Penyebaran melalui folder berbagi' }
  ],
  ddos: [
    { tipe: 'IP', nilai: '4.000 alamat sumber', keterangan: 'Sebagian besar di luar negeri, pola permintaan identik' },
    { tipe: 'Pola', nilai: '6.000 koneksi aktif', keterangan: 'Koneksi setengah terbuka ke port 443' },
    { tipe: 'Layanan', nilai: 'HTTP/HTTPS publik', keterangan: 'Target utama ketersediaan layanan' },
    { tipe: 'Domain', nilai: 'pemulihan-layanan[.]support', keterangan: 'Email palsu meminta kredensial admin' }
  ]
};

function topologi(s) {
  const nodes = [
    { id: 'inet', label: 'INTERNET', tipe: 'zona', tier: 0, aset: 'Jalur publik', os: '—', risiko: 'Tidak terbatas', catatan: 'Satu-satunya jalur masuk dari luar' },
    { id: 'edge', label: s.edge, tipe: 'jaringan', tier: 1, aset: 'Router / firewall tepi', os: 'RouterOS / firmware', risiko: 'Kredensial bawaan, aturan longgar', catatan: 'Titik kontrol utama lalu lintas' }
  ];
  if (s.srv) nodes.push({ id: 'srv', label: s.srv, tipe: 'server', tier: 2, aset: 'Server layanan internal', os: 'Windows Server 2016', risiko: 'Tambalan tertunda, SMB terbuka', catatan: 'Menyimpan data operasional' });
  if (s.ot) nodes.push({ id: 'ot', label: s.ot, tipe: 'ot', tier: 2, aset: 'Perangkat operasional (OT)', os: 'Firmware pabrikan', risiko: 'Kata sandi bawaan, tanpa segmentasi', catatan: 'Tidak boleh dipindai aktif' });
  nodes.push({ id: 'host', label: s.host, tipe: 'host', tier: 3, aset: 'Workstation staf', os: 'Windows 10 Pro', risiko: 'Hak admin lokal, USB bebas', catatan: 'Titik awal paling sering dikompromikan' });
  nodes.push({ id: 'user', label: `PC-${s.id.toUpperCase()}-02`, tipe: 'host', tier: 3, aset: 'Workstation pendukung', os: 'Windows 10 Pro', risiko: 'Antivirus tidak terkelola', catatan: 'Berbagi folder dengan host lain' });
  nodes.push({ id: 'periph', label: 'PERANGKAT PENDUKUNG', tipe: 'periferal', tier: 3, aset: 'Printer jaringan, CCTV, AP', os: 'Firmware', risiko: 'Kata sandi bawaan, jarang diperbarui', catatan: 'Sering terlupakan dalam inventaris' });
  const links = [['inet', 'edge'], ['edge', 'srv'], ['edge', 'ot'], ['edge', 'host'], ['edge', 'user'], ['host', 'periph']].filter(([a, b]) => nodes.some((n) => n.id === a) && nodes.some((n) => n.id === b));
  return { nodes, links };
}

function objektif(a, s, lv) {
  return [
    `Mengenali indikasi ${a.nama} pada lingkungan ${s.nama} sebelum berdampak luas.`,
    'Menerapkan urutan penanganan insiden: identifikasi, isolasi, pemulihan, pelaporan.',
    `Mengambil keputusan komando pada tingkat kesulitan ${LEVEL[lv].nama.toLowerCase()} dengan informasi yang tidak lengkap.`,
    'Mendokumentasikan barang bukti digital dan menyusun laporan insiden sesuai prosedur.',
    a.id === 'psyops' ? 'Membedakan operasi informasi terkoordinasi dari kritik publik yang sah.' : 'Menjaga kesinambungan layanan kritis selama penanganan insiden.'
  ];
}

function rubrik() {
  return KOMPETENSI.map((k) => ({
    id: k.id, nama: k.nama, bobot: k.bobot, deskripsi: k.deskripsi,
    kriteria: [
      { level: 'Kurang', deskripsi: `Belum menunjukkan tindakan ${k.nama.toLowerCase()} yang relevan.` },
      { level: 'Cukup', deskripsi: `Menunjukkan ${k.nama.toLowerCase()} dasar namun tidak lengkap atau terlambat.` },
      { level: 'Baik', deskripsi: `Menunjukkan ${k.nama.toLowerCase()} tepat pada sebagian besar kesempatan.` },
      { level: 'Sangat Baik', deskripsi: `Konsisten, terukur, dan sesuai prosedur pada seluruh kesempatan.` }
    ]
  }));
}

function fasilitator(a, s, lv) {
  return {
    persiapan: [
      `Siapkan ruang dengan satu layar utama dan satu layar skor.`,
      `Cetak buku peserta dan lembar keputusan untuk ${LEVEL[lv].personel} peserta.`,
      `Pastikan tidak ada akses internet ke sistem nyata. Seluruh inject bersifat simulasi.`,
      `Tunjuk satu pencatat waktu dan satu penilai independen.`,
      s.ot ? `Ingatkan peserta: perangkat OT (${s.ot}) tidak boleh dipindai aktif dalam latihan.` : `Ingatkan peserta untuk tidak melakukan pemindaian ke jaringan nyata.`
    ],
    jalankan: [
      'Bacakan narasi inject apa adanya. Jangan menambah petunjuk.',
      'Beri waktu diskusi 3–5 menit, lalu minta keputusan tertulis.',
      'Catat pilihan peserta, bukan hanya jawaban lisan.',
      'Umpan balik diberikan setelah keputusan dicatat, bukan sebelumnya.',
      'Jaga agar tekanan waktu terasa: tampilkan hitungan waktu.'
    ],
    aturan: [
      'Tidak ada jawaban tunggal yang sempurna; yang dinilai adalah alasan dan urutan tindakan.',
      'Peserta boleh bertanya, tetapi fasilitator hanya menjawab sesuai informasi pada inject.',
      'Keputusan yang melanggar prosedur tetap dicatat sebagai bagian penilaian komando.',
      'Setiap sesi diakhiri dengan After Action Review, bukan dengan mencari kesalahan individu.'
    ],
    pertanyaanDiskusi: [
      'Pada inject mana informasi paling tidak lengkap, dan bagaimana Anda memutuskan?',
      'Tindakan mana yang paling berhasil menahan dampak?',
      'Apa yang akan Anda ubah bila kejadian serupa terjadi minggu depan?',
      'Siapa yang harus dilibatkan lebih awal dalam rantai komando?'
    ]
  };
}

function ringkasan(a, s, lv) {
  return `Latihan tabletop ${LEVEL[lv].nama.toLowerCase()} yang mensimulasikan kampanye ${a.nama} — ${a.jenis.toLowerCase()} dengan motivasi ${a.motivasi.toLowerCase()} — terhadap ${s.nama} di ${s.lokasi}. ` +
    `Peserta menghadapi ${LEVEL[lv].inject} inject keputusan berurutan selama kurang lebih ${LEVEL[lv].menit} menit, mulai dari indikasi awal hingga pelaporan resmi. ` +
    `Penilaian mencakup enam kompetensi: deteksi, penahanan, pemulihan, forensik, pelaporan, dan komando. ` +
    `Aset yang menjadi sasaran utama: ${s.kritis.join(', ').toLowerCase()}.`;
}

export function daftarKombinasi() {
  return {
    satuan: SATUAN.map((s) => ({ id: s.id, nama: s.nama, jenis: s.jenis, personel: s.personel, lokasi: s.lokasi, ot: !!s.ot })),
    aktor: AKTOR.map((a) => ({ id: a.id, nama: a.nama, jenis: a.jenis, kemampuan: a.kemampuan, motivasi: a.motivasi, ciri: a.ciri })),
    level: Object.entries(LEVEL).map(([id, v]) => ({ id, ...v }))
  };
}


// ---- Analisis jalur serangan (heuristik, bukan hasil pemindaian) ----
const BOBOT_NODE = { zona: 0, jaringan: 4, server: 5, ot: 7, host: 4, periferal: 3 };

const KONTROL = {
  'Kredensial bawaan': 'Ganti kredensial bawaan seluruh perangkat tepi, aktifkan MFA untuk akun administrator, dan simpan di brankas kata sandi satuan.',
  'Kata sandi bawaan': 'Ganti kata sandi pabrik pada perangkat OT, terapkan akses baca-saja untuk pemantauan, dan pisahkan VLAN OT dari IT.',
  'Tambalan tertunda': 'Terapkan siklus tambalan bulanan dengan jendela pemeliharaan tetap; prioritaskan layanan yang terekspos ke jaringan pengguna.',
  'SMB terbuka': 'Blokir SMB (445) antar-workstation, aktifkan penandatanganan SMB, dan batasi berbagi hanya ke server berkas.',
  'Hak admin lokal': 'Terapkan prinsip hak minimum: akun pengguna biasa untuk kerja harian, akun admin hanya untuk tugas administratif.',
  'USB bebas': 'Terapkan kebijakan media lepas: hanya media terdaftar, pemindaian wajib, dan penonaktifan port USB mass storage.',
  'Tanpa segmentasi': 'Segmentasikan jaringan menjadi zona IT, OT, dan tamu; terapkan aturan antar-zona yang eksplisit.',
  'Antivirus tidak terkelola': 'Pasang agen EDR terpusat dengan pembaruan definisi otomatis dan pemantauan dari satu konsol.',
  'Kata sandi bawaan, jarang diperbarui': 'Inventarisasi perangkat pendukung, ganti kredensial bawaan, dan jadwalkan pembaruan firmware.',
  'Antivirus tidak terkelola, berbagi folder': 'Batasi berbagi folder ke server berkas dan aktifkan pemantauan endpoint.'
};

function analisisJalur(t) {
  const peta = Object.fromEntries(t.nodes.map((n) => [n.id, n]));
  const tetangga = {};
  t.links.forEach(([a, b]) => {
    (tetangga[a] = tetangga[a] || []).push(b);
    (tetangga[b] = tetangga[b] || []).push(a);
  });
  let target = t.nodes.filter((n) => ['server', 'ot', 'host'].includes(n.tipe)).map((n) => n.id);
  if (!target.length) target = t.nodes.filter((n) => n.tipe === 'periferal').map((n) => n.id);
  const jalur = [];
  const telusuri = (simpul, lintasan) => {
    if (lintasan.length > 4) return;
    if (target.includes(simpul) && lintasan.length > 1) {
      const skor = lintasan.reduce((a, id) => a + (BOBOT_NODE[peta[id].tipe] || 0), 0);
      jalur.push({ simpul: [...lintasan], skor });
      return;
    }
    for (const next of tetangga[simpul] || []) {
      if (lintasan.includes(next)) continue;
      telusuri(next, [...lintasan, next]);
    }
  };
  telusuri('inet', ['inet']);

  jalur.sort((a, b) => b.skor - a.skor);
  const unik = [];
  const kunci = new Set();
  for (const j of jalur) {
    const k = j.simpul.join('>');
    if (kunci.has(k)) continue;
    kunci.add(k);
    unik.push(j);
    if (unik.length >= 4) break;
  }

  const paparan = Math.min(100, Math.round((Math.max(...jalur.map((j) => j.skor), 1) / 15) * 100));

  const hitung = {};
  unik.forEach((j) => j.simpul.slice(1).forEach((id) => { hitung[id] = (hitung[id] || 0) + 1; }));
  const choke = Object.entries(hitung).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([id]) => peta[id]);

  const kontrol = [];
  t.nodes.forEach((n) => {
    (n.risiko || '').split(',').forEach((r) => {
      const k = KONTROL[r.trim()];
      if (k && !kontrol.find((x) => x.teks === k)) kontrol.push({ aset: n.label, teks: k });
    });
  });

  const DAMPAK = {
    server: 'Penguasaan server dan data operasional',
    ot: 'Penguasaan perangkat operasional — dampak fisik',
    host: 'Penguasaan workstation staf',
    periferal: 'Pivot ke perangkat pendukung'
  };

  return {
    paparan,
    jalur: unik.map((j) => {
      const akhir = peta[j.simpul[j.simpul.length - 1]];
      return {
        simpul: j.simpul.map((id) => peta[id].label),
        tipe: j.simpul.map((id) => peta[id].tipe),
        skor: Math.min(100, Math.round((j.skor / 15) * 100)),
        dampak: DAMPAK[akhir.tipe] || 'Penguasaan aset',
        target: akhir.label
      };
    }),
    chokePoints: choke.map((n) => ({ label: n.label, tipe: n.tipe, risiko: n.risiko })),
    kontrol: kontrol.slice(0, 5),
    catatan: 'Model heuristik berbasis inventaris aset dan kelemahan yang tercatat. Bukan hasil pemindaian aktif — aman dijalankan pada jaringan operasional.'
  };
}

let counter = 0;
export function bangkitkanPaket({ satuanId = 'poslog', aktorId = 'ransomware', level = 'menengah' }) {
  const s = SATUAN.find((x) => x.id === satuanId) || SATUAN[0];
  const a = AKTOR.find((x) => x.id === aktorId) || AKTOR[0];
  const lv = LEVEL[level] ? level : 'menengah';
  const jumlah = LEVEL[lv].inject;

  let injects = a.injects.map((inj, i) => ({
    id: `INJ-${pad(i + 1)}`,
    urutan: i + 1,
    jam: jamInject(i, lv),
    kanal: inj.kanal,
    judul: inj.judul,
    narasi: isiTeks(inj.narasi, s),
    pertanyaan: inj.pertanyaan,
    opsi: inj.opsi.map((o, j) => ({
      id: `O${j + 1}`,
      teks: isiTeks(o.teks, s),
      skor: o.skor,
      baik: !!o.baik,
      umpan: o.umpan
    }))
  }));

  if (jumlah > injects.length) {
    const tambahan = INJECT_LANJUT.slice(0, jumlah - injects.length).map((inj, i) => ({
      id: `INJ-${pad(injects.length + i + 1)}`,
      urutan: injects.length + i + 1,
      jam: jamInject(injects.length + i, lv),
      kanal: inj.kanal,
      judul: inj.judul,
      narasi: isiTeks(inj.narasi, s),
      pertanyaan: inj.pertanyaan,
      opsi: inj.opsi.map((o, j) => ({ id: `O${j + 1}`, teks: isiTeks(o.teks, s), skor: o.skor, baik: !!o.baik, umpan: o.umpan }))
    }));
    injects = injects.concat(tambahan);
  }
  injects = injects.slice(0, jumlah);

  const mitre = [];
  a.killchain.forEach((f) => f.teknik.forEach((t) => { if (!mitre.find((m) => m.id === t.id)) mitre.push(t); }));

  counter += 1;
  const id = `PKT-${Date.now().toString(36).toUpperCase()}${counter}`;

  const topo = topologi(s);
  const aturan = aturanUntuk(mitre);

  return {
    id,
    dibuat: new Date().toISOString(),
    meta: {
      nama: `${a.nama} vs ${s.nama}`,
      satuan: s, aktor: a, level: lv, levelNama: LEVEL[lv].nama,
      menit: LEVEL[lv].menit, jumlahInject: injects.length,
      personel: LEVEL[lv].personel,
      kategori: s.ot ? 'Dukungan Teknologi / IT-OT' : 'Penangkalan / Pertahanan Siber',
      versi: '1.0'
    },
    ringkasan: ringkasan(a, s, lv),
    objektif: objektif(a, s, lv),
    topologi: topo,
    killchain: a.killchain.map((f, i) => ({
      fase: f.fase, urutan: i + 1,
      teknik: f.teknik,
      indikator: f.indikator
    })),
    injects,
    rubrik: rubrik(),
    risiko: analisisJalur(topo),
    deteksi: { aturan, cakupan: `${aturan.length}/${mitre.length}` },
    ioc: IOC[a.id] || [],
    mitre,
    fasilitator: fasilitator(a, s, lv),
    prasyarat: [
      'Peserta memahami prosedur pelaporan insiden satuan.',
      'Fasilitator menyiapkan lembar keputusan dan papan skor.',
      'Tidak diperlukan perangkat lunak khusus untuk mode tabletop.',
      'Untuk mode lab: satu host dengan Docker, jaringan terisolasi, tanpa akses internet.'
    ],
    biaya: {
      modeTabletop: 'Rp 0 — tanpa perangkat tambahan',
      modeLab: 'Rp 0 — memakai perangkat yang sudah ada (Docker pada 1 laptop)',
      estimasiWaktuPersiapan: '45 menit'
    }
  };
}

export function hitungAAR(paket, jawaban) {
  // jawaban: { [injectId]: [optionId, ...] }
  const perKompetensi = {};
  KOMPETENSI.forEach((k) => { perKompetensi[k.id] = { total: 0, maks: 0 }; });

  const rincian = paket.injects.map((inj) => {
    const dipilih = jawaban[inj.id] || [];
    const opsiTerpilih = inj.opsi.filter((o) => dipilih.includes(o.id));
    const skor = { deteksi: 0, containment: 0, eradikasi: 0, forensik: 0, pelaporan: 0, komando: 0 };
    opsiTerpilih.forEach((o) => Object.keys(skor).forEach((k) => { skor[k] += o.skor[k] || 0; }));
    // normalisasi per inject: maksimum per kompetensi adalah skor opsi terbaik pada inject itu
    KOMPETENSI.forEach((k) => {
      const maks = Math.max(...inj.opsi.map((o) => o.skor[k.id] || 0), 1);
      perKompetensi[k.id].total += Math.min(skor[k.id], maks);
      perKompetensi[k.id].maks += maks;
    });
    const jmlBaik = opsiTerpilih.filter((o) => o.baik).length;
    const status = !opsiTerpilih.length ? 'KOSONG' : jmlBaik === opsiTerpilih.length ? 'TEPAT' : jmlBaik > 0 ? 'SEBAGIAN' : 'KURANG';
    return {
      id: inj.id, judul: inj.judul, kanal: inj.kanal, status,
      dipilih: opsiTerpilih.map((o) => o.teks),
      skor,
      umpan: opsiTerpilih.map((o) => o.umpan),
      terbaik: inj.opsi.filter((o) => o.baik).map((o) => o.teks)
    };
  });

  const skorKompetensi = KOMPETENSI.map((k) => {
    const v = perKompetensi[k.id];
    const nilai = v.maks ? Math.round((v.total / v.maks) * 100) : 0;
    return { ...k, nilai };
  });

  const readiness = Math.round(skorKompetensi.reduce((acc, k) => acc + (k.nilai * k.bobot) / 100, 0));
  const urut = [...skorKompetensi].sort((a, b) => b.nilai - a.nilai);
  const kuat = urut.slice(0, 2);
  const diBawah = urut.filter((k) => k.nilai < 80);
  const lemah = diBawah.length ? diBawah.slice(-2).reverse() : urut.slice(-1);

  const grade = readiness >= 85 ? 'SIAP' : readiness >= 70 ? 'CUKUP SIAP' : readiness >= 55 ? 'PERLU LATIHAN' : 'BELUM SIAP';

  const rekomendasi = lemah.filter((k) => k.nilai < 90).map((k) => ({
    kompetensi: k.nama,
    nilai: k.nilai,
    saran: SARAN[k.id]
  }));

  return {
    readiness, grade, skorKompetensi, rincian,
    risikoBersih: paket.risiko ? Math.round(paket.risiko.paparan * (0.35 + 0.65 * (1 - readiness / 100))) : null,
    paparan: paket.risiko ? paket.risiko.paparan : null,
    kuat: kuat.map((k) => ({ nama: k.nama, nilai: k.nilai, deskripsi: k.deskripsi })),
    lemah: lemah.map((k) => ({ nama: k.nama, nilai: k.nilai, deskripsi: k.deskripsi })),
    rekomendasi,
    jumlahInject: paket.injects.length,
    dijawab: Object.keys(jawaban).filter((k) => (jawaban[k] || []).length).length
  };
}

const SARAN = {
  deteksi: 'Latih ulang pembacaan log dan indikator awal. Tambahkan prosedur pemeriksaan log harian 15 menit serta daftar indikator siap pakai di pos jaga.',
  containment: 'Buat kartu keputusan isolasi: siapa yang berwenang memutus tautan, kapan, dan bagaimana mencatatnya. Latih simulasi 10 menit setiap apel pagi.',
  eradikasi: 'Susun prosedur pemulihan bertahap dengan urutan layanan prioritas. Uji pemulihan dari cadangan offline minimal sekali per kuartal.',
  forensik: 'Standarkan pengambilan barang bukti: hash, catatan waktu, rantai pengawasan. Sediakan satu perangkat khusus analisis yang tidak dipakai kerja harian.',
  pelaporan: 'Sediakan templat laporan insiden satu halaman: kronologi, dampak, tindakan, kebutuhan dukungan. Latih pengisiannya dalam 15 menit.',
  komando: 'Latih pengambilan keputusan dengan informasi tidak lengkap. Tegaskan kewenangan tiap jenjang agar tidak ada kebingungan saat insiden nyata.'
};
