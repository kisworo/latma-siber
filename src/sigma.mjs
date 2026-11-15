// Aturan deteksi Sigma yang dibangkitkan dari teknik ATT&CK pada skenario.
// Semua aturan bersifat template latihan: dapat dipasang di SIEM satuan, lalu disesuaikan.

export const SIGMA = {
  'T1566.002': {
    judul: 'Email dengan tautan ke domain mirip layanan internal',
    level: 'medium',
    logsource: ['product: windows', 'category: proxy'],
    deteksi: [
      'selection:',
      '  url|contains:',
      "    - 'login-'",
      "    - 'verifikasi-'",
      "    - 'pembaruan-akun'",
      '  cs-method: GET',
      'condition: selection'
    ],
    falsepositives: ['Kampanye email resmi dengan tautan pendek', 'Portal mitra dengan penamaan serupa'],
    tags: ['attack.initial_access', 'attack.t1566.002']
  },
  'T1566.001': {
    judul: 'Lampiran email berupa dokumen bermakro',
    level: 'high',
    logsource: ['product: windows', 'category: file_event'],
    deteksi: [
      'selection:',
      "  target_filename|endswith:",
      "    - '.docm'",
      "    - '.xlsm'",
      "    - '.pptm'",
      '  image|endswith:',
      "    - '\\OUTLOOK.EXE'",
      'condition: selection'
    ],
    falsepositives: ['Dokumen dinas resmi bermakro yang ditandatangani'],
    tags: ['attack.initial_access', 'attack.t1566.001']
  },
  'T1190': {
    judul: 'Permintaan eksploitasi pada aplikasi publik',
    level: 'high',
    logsource: ['product: windows', 'category: webserver'],
    deteksi: [
      'selection:',
      '  cs-uri-query|contains:',
      "    - '../'",
      "    - 'cmd='",
      "    - 'union select'",
      "    - '${jndi:'",
      '  sc-status: 200',
      'condition: selection'
    ],
    falsepositives: ['Pengujian penetrasi terjadwal', 'Aplikasi lama dengan parameter mirip'],
    tags: ['attack.initial_access', 'attack.t1190']
  },
  'T1078': {
    judul: 'Login akun sah di luar jam dinas dari lokasi baru',
    level: 'medium',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 4624',
      '  logon_type: 10',
      '  hour|lt: 6',
      'condition: selection | count() by target_username > 3'
    ],
    falsepositives: ['Petugas jaga', 'Pemeliharaan terjadwal vendor'],
    tags: ['attack.defense_evasion', 'attack.t1078']
  },
  'T1204.002': {
    judul: 'Eksekusi berkas dari folder unduhan oleh aplikasi perkantoran',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  parentimage|endswith:',
      "    - '\\WINWORD.EXE'",
      "    - '\\EXCEL.EXE'",
      '  image|endswith:',
      "    - '\\cmd.exe'",
      "    - '\\powershell.exe'",
      "    - '\\wscript.exe'",
      'condition: selection'
    ],
    falsepositives: ['Makro resmi untuk integrasi sistem'],
    tags: ['attack.execution', 'attack.t1204.002']
  },
  'T1059.001': {
    judul: 'PowerShell dengan perintah terenkode',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      "  image|endswith: '\\powershell.exe'",
      '  commandline|contains:',
      "    - '-enc '",
      "    - '-encodedcommand'",
      "    - 'frombase64string'",
      "    - '-windowstyle hidden'",
      'condition: selection'
    ],
    falsepositives: ['Skrip administrasi terjadwal yang belum ditandatangani'],
    tags: ['attack.execution', 'attack.t1059.001']
  },
  'T1059.005': {
    judul: 'Windows Script Host menjalankan skrip dari folder sementara',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      "  image|endswith: '\\wscript.exe'",
      "  commandline|contains: '\\Temp\\'",
      'condition: selection'
    ],
    falsepositives: ['Instalasi perangkat lunak lama'],
    tags: ['attack.execution', 'attack.t1059.005']
  },
  'T1543.003': {
    judul: 'Pembuatan layanan baru dengan path di folder pengguna',
    level: 'high',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 7045',
      '  servicestarttype: auto',
      '  imagepath|contains:',
      "    - '\\AppData\\'",
      "    - '\\Temp\\'",
      "    - '\\Users\\Public\\'",
      'condition: selection'
    ],
    falsepositives: ['Agen pembaruan pihak ketiga'],
    tags: ['attack.persistence', 'attack.t1543.003']
  },
  'T1053.005': {
    judul: 'Tugas terjadwal baru yang meniru nama pembaruan',
    level: 'medium',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 4698',
      '  taskname|contains:',
      "    - 'Update'",
      "    - 'MicrosoftEdge'",
      "    - 'WinUpdate'",
      'condition: selection'
    ],
    falsepositives: ['Pembaruan resmi yang dijadwalkan administrator'],
    tags: ['attack.persistence', 'attack.t1053.005']
  },
  'T1547.001': {
    judul: 'Entri autostart baru pada registry pengguna',
    level: 'medium',
    logsource: ['product: windows', 'category: registry_set'],
    deteksi: [
      'selection:',
      '  targetobject|contains:',
      "    - '\\CurrentVersion\\Run\\'",
      "    - '\\CurrentVersion\\RunOnce\\'",
      '  details|contains:',
      "    - '\\AppData\\'",
      "    - '\\Temp\\'",
      'condition: selection'
    ],
    falsepositives: ['Aplikasi pengguna sah yang memakai autostart'],
    tags: ['attack.persistence', 'attack.t1547.001']
  },
  'T1003.001': {
    judul: 'Akses ke memori proses LSASS',
    level: 'critical',
    logsource: ['product: windows', 'category: process_access'],
    deteksi: [
      'selection:',
      "  targetimage|endswith: '\\lsass.exe'",
      '  grantedaccess|contains:',
      "    - '0x1010'",
      "    - '0x1410'",
      "    - '0x1fffff'",
      'condition: selection'
    ],
    falsepositives: ['Alat pemantauan endpoint tertentu', 'Proses pencadangan sistem'],
    tags: ['attack.credential_access', 'attack.t1003.001']
  },
  'T1021.001': {
    judul: 'Koneksi RDP dari segmen non-admin',
    level: 'medium',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 4624',
      '  logon_type: 10',
      '  sourceip|not_in:',
      "    - '10.10.0.0/16'",
      'condition: selection'
    ],
    falsepositives: ['Akses vendor terjadwal', 'Personel mobilitas'],
    tags: ['attack.lateral_movement', 'attack.t1021.001']
  },
  'T1021.002': {
    judul: 'Akses berbagi admin SMB antar-workstation',
    level: 'high',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 5140',
      '  sharename|endswith:',
      "    - '$'",
      '  sourceip|not_in:',
      "    - '10.10.0.0/16'",
      'condition: selection'
    ],
    falsepositives: ['Pencadangan terjadwal', 'Alat manajemen terpusat'],
    tags: ['attack.lateral_movement', 'attack.t1021.002']
  },
  'T1046': {
    judul: 'Pemindaian port internal dalam waktu singkat',
    level: 'medium',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 5156',
      '  destinationport|lt: 1024',
      'condition: selection | count(destination_port) by source_ip > 40'
    ],
    falsepositives: ['Alat pemantauan jaringan', 'Pemindaian kerentanan terjadwal'],
    tags: ['attack.discovery', 'attack.t1046']
  },
  'T1486': {
    judul: 'Enkripsi massal berkas pengguna',
    level: 'critical',
    logsource: ['product: windows', 'category: file_event'],
    deteksi: [
      'selection:',
      "  target_filename|endswith:",
      "    - '.r93'",
      "    - '.locked'",
      "    - '.enc'",
      'condition: selection | count() by host > 20'
    ],
    falsepositives: ['Aplikasi enkripsi arsip sah'],
    tags: ['attack.impact', 'attack.t1486']
  },
  'T1490': {
    judul: 'Penghapusan cadangan bayangan sistem',
    level: 'critical',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  image|endswith:',
      "    - '\\vssadmin.exe'",
      "    - '\\wbadmin.exe'",
      '  commandline|contains:',
      "    - 'delete'",
      "    - 'shadows'",
      "    - 'catalog'",
      'condition: selection'
    ],
    falsepositives: ['Pemeliharaan ruang disk oleh administrator'],
    tags: ['attack.impact', 'attack.t1490']
  },
  'T1562.001': {
    judul: 'Penonaktifan antivirus atau agen keamanan',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      "  image|endswith: '\\powershell.exe'",
      '  commandline|contains:',
      "    - 'Set-MpPreference'",
      "    - 'DisableRealtimeMonitoring'",
      "    - 'sc stop'",
      'condition: selection'
    ],
    falsepositives: ['Administrator menyiapkan pencitraan sistem'],
    tags: ['attack.defense_evasion', 'attack.t1562.001']
  },
  'T1070.001': {
    judul: 'Penghapusan log peristiwa Windows',
    level: 'high',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 1102',
      'condition: selection'
    ],
    falsepositives: ['Pemeliharaan log oleh administrator'],
    tags: ['attack.defense_evasion', 'attack.t1070.001']
  },
  'T1041': {
    judul: 'Transfer data keluar dalam jumlah besar ke satu tujuan',
    level: 'high',
    logsource: ['product: windows', 'category: proxy'],
    deteksi: [
      'selection:',
      '  cs-bytes|gte: 50000000',
      '  sc-status: 200',
      'condition: selection | count() by destination_ip > 1'
    ],
    falsepositives: ['Pencadangan ke penyimpanan awan resmi'],
    tags: ['attack.exfiltration', 'attack.t1041']
  },
  'T1567.002': {
    judul: 'Unggahan ke layanan penyimpanan awan dari host server',
    level: 'medium',
    logsource: ['product: windows', 'category: proxy'],
    deteksi: [
      'selection:',
      '  url|contains:',
      "    - 'drive.google.com'",
      "    - 'dropbox.com'",
      "    - 'mega.nz'",
      '  cs-method: POST',
      'condition: selection'
    ],
    falsepositives: ['Personel menyimpan dokumen dinas secara sah'],
    tags: ['attack.exfiltration', 'attack.t1567.002']
  },
  'T1195.002': {
    judul: 'Pembaruan aplikasi dengan hash tidak cocok',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  image|endswith:',
      "    - '\\msiexec.exe'",
      "    - '\\setup.exe'",
      '  commandline|contains:',
      "    - '/qn'",
      "    - '/i'",
      '  user|contains:',
      "    - 'svc_'",
      'condition: selection'
    ],
    falsepositives: ['Instalasi terjadwal oleh tim TI'],
    tags: ['attack.initial_access', 'attack.t1195.002']
  },
  'T1133': {
    judul: 'Akses remote eksternal di luar jadwal pemeliharaan',
    level: 'medium',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 4624',
      '  logon_type: 10',
      '  hour|lt: 6',
      '  target_username|contains:',
      "    - 'vendor'",
      "    - 'svc_'",
      'condition: selection'
    ],
    falsepositives: ['Pemeliharaan darurat yang dilaporkan'],
    tags: ['attack.initial_access', 'attack.t1133']
  },
  'T1091': {
    judul: 'Eksekusi berkas dari media lepas',
    level: 'high',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  image|startswith:',
      "    - 'D:\\'",
      "    - 'E:\\'",
      "    - 'F:\\'",
      'condition: selection'
    ],
    falsepositives: ['Alat diagnosa dari media resmi'],
    tags: ['attack.initial_access', 'attack.t1091']
  },
  'T1200': {
    judul: 'Perangkat penyimpanan baru terpasang pada host',
    level: 'low',
    logsource: ['product: windows', 'category: driver_load'],
    deteksi: [
      'selection:',
      '  eventid: 2003',
      'condition: selection'
    ],
    falsepositives: ['Media resmi yang terdaftar'],
    tags: ['attack.initial_access', 'attack.t1200']
  },
  'T1498.001': {
    judul: 'Banjir trafik langsung ke layanan publik',
    level: 'high',
    logsource: ['product: windows', 'category: webserver'],
    deteksi: [
      'selection:',
      '  sc-status: 503',
      'condition: selection | count() by source_ip > 500'
    ],
    falsepositives: ['Kampanye publikasi besar', 'Uji beban terjadwal'],
    tags: ['attack.impact', 'attack.t1498.001']
  },
  'T1018': {
    judul: 'Penemuan host internal secara berurutan',
    level: 'low',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 5156',
      '  destinationport: 445',
      'condition: selection | count(destination_ip) by source_ip > 20'
    ],
    falsepositives: ['Inventarisasi jaringan otomatis'],
    tags: ['attack.discovery', 'attack.t1018']
  },
  'T1570': {
    judul: 'Pemindahan alat antar-host melalui berbagi admin',
    level: 'high',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 5145',
      '  relativename|endswith:',
      "    - '.exe'",
      "    - '.dll'",
      "    - '.ps1'",
      'condition: selection'
    ],
    falsepositives: ['Distribusi perangkat lunak terpusat'],
    tags: ['attack.lateral_movement', 'attack.t1570']
  },
  'T1105': {
    judul: 'Unduhan berkas dari alamat tidak dikenal',
    level: 'medium',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  image|endswith:',
      "    - '\\certutil.exe'",
      "    - '\\bitsadmin.exe'",
      '  commandline|contains:',
      "    - 'http'",
      'condition: selection'
    ],
    falsepositives: ['Pembaruan sertifikat resmi'],
    tags: ['attack.command_and_control', 'attack.t1105']
  },
  'T1071.001': {
    judul: 'Koneksi berulang ke satu domain dengan interval tetap',
    level: 'medium',
    logsource: ['product: windows', 'category: dns'],
    deteksi: [
      'selection:',
      '  query|endswith:',
      "    - '.top'",
      "    - '.site'",
      "    - '.xyz'",
      'condition: selection | count() by query, host > 30'
    ],
    falsepositives: ['Layanan pihak ketiga dengan domain tidak lazim'],
    tags: ['attack.command_and_control', 'attack.t1071.001']
  },
  'T1087': {
    judul: 'Pencacahan akun domain dalam jumlah besar',
    level: 'low',
    logsource: ['product: windows', 'service: security'],
    deteksi: [
      'selection:',
      '  eventid: 4661',
      'condition: selection | count() by subject_username > 50'
    ],
    falsepositives: ['Audit akun oleh administrator'],
    tags: ['attack.discovery', 'attack.t1087']
  },
  'T1489': {
    judul: 'Penghentian layanan kritis secara serentak',
    level: 'high',
    logsource: ['product: windows', 'service: system'],
    deteksi: [
      'selection:',
      '  eventid: 7036',
      '  param2: stopped',
      'condition: selection | count() by host > 3'
    ],
    falsepositives: ['Pemeliharaan terjadwal'],
    tags: ['attack.impact', 'attack.t1489']
  },
  'T1052.001': {
    judul: 'Penyalinan berkas dalam jumlah besar ke media lepas',
    level: 'high',
    logsource: ['product: windows', 'category: file_event'],
    deteksi: [
      'selection:',
      '  target_filename|contains:',
      "    - 'D:\\'",
      "    - 'E:\\'",
      'condition: selection | count() by host > 100'
    ],
    falsepositives: ['Pencadangan manual oleh personel'],
    tags: ['attack.exfiltration', 'attack.t1052.001']
  },
  'T1222': {
    judul: 'Perubahan izin folder arsip menjadi terbuka',
    level: 'medium',
    logsource: ['product: windows', 'category: process_creation'],
    deteksi: [
      'selection:',
      '  image|endswith:',
      "    - '\\icacls.exe'",
      "    - '\\takeown.exe'",
      '  commandline|contains:',
      "    - 'Everyone'",
      "    - '/grant'",
      'condition: selection'
    ],
    falsepositives: ['Penyesuaian hak akses oleh administrator'],
    tags: ['attack.defense_evasion', 'attack.t1222']
  },
  'T1119': {
    judul: 'Pengumpulan berkas otomatis dari banyak folder',
    level: 'medium',
    logsource: ['product: windows', 'category: file_event'],
    deteksi: [
      'selection:',
      '  target_filename|endswith:',
      "    - '.docx'",
      "    - '.xlsx'",
      "    - '.pdf'",
      'condition: selection | count() by host > 200'
    ],
    falsepositives: ['Migrasi data resmi'],
    tags: ['attack.collection', 'attack.t1119']
  }
};

export function aturanUntuk(mitre) {
  const hasil = [];
  for (const t of mitre) {
    const s = SIGMA[t.id];
    if (!s) continue;
    const item = {
      teknik: t.id,
      namaTeknik: t.nama,
      judul: s.judul,
      level: s.level,
      logsource: s.logsource,
      deteksi: s.deteksi,
      falsepositives: s.falsepositives,
      tags: s.tags
    };
    item.yaml = yamlAturan(item);
    hasil.push(item);
  }
  return hasil;
}

export function yamlAturan(r) {
  const id = 'latma-' + r.teknik.toLowerCase().replace('.', '-');
  return [
    `title: ${r.judul}`,
    `id: ${id}`,
    'status: experimental',
    `description: Terdeteksi pada skenario latihan LATMA SIBER (${r.teknik} — ${r.namaTeknik}).`,
    'references:',
    `  - https://attack.mitre.org/techniques/${r.teknik.replace('.', '/')}/`,
    'author: LATMA SIBER',
    'logsource:',
    ...r.logsource.map((l) => '  ' + l),
    'detection:',
    ...r.deteksi.map((l) => '  ' + l),
    'falsepositives:',
    ...r.falsepositives.map((f) => `  - ${f}`),
    `level: ${r.level}`,
    'tags:',
    ...r.tags.map((t) => `  - ${t}`)
  ].join('\n');
}
