const app = document.getElementById('app');

const state = {
  meta: null, dash: null, paket: null, sesi: null,
  pilih: { satuan: 'poslog', aktor: 'ransomware', level: 'menengah' },
  tab: 'ringkasan', idx: 0, pilihOpsi: [], fb: null, tim: '', mulai: 0, timer: null
};

const MODE = (typeof window !== 'undefined' && window.LATMA_MODE) || 'http';

/* Mode statis: seluruh mesin berjalan di peramban, data disimpan lokal. */
const KUNCI = 'latma_store_v1';
const bacaStore = () => { try { return JSON.parse(localStorage.getItem(KUNCI)) || { paket: [], sesi: [] }; } catch { return { paket: [], sesi: [] }; } };
const tulisStore = (s) => localStorage.setItem(KUNCI, JSON.stringify(s));
const idBaru = (p) => p + '-' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 89 + 10);

function seedDemo(gen) {
  const s = { paket: [], sesi: [], seeded: true };
  const p = gen.bangkitkanPaket({ satuanId: 'poslog', aktorId: 'ransomware', level: 'menengah' });
  s.paket.push(p);
  const pola = [['O1', 'O2'], ['O1'], ['O4'], ['O1'], ['O3'], ['O1'], ['O1']];
  const sesi = {
    id: idBaru('SES'), paketId: p.id, paketSatuan: p.meta.satuan.id,
    satuanNama: p.meta.satuan.nama, aktorNama: p.meta.aktor.nama, level: p.meta.levelNama,
    tim: 'Tim Siber Pos Logistik', mulai: new Date(Date.now() - 86400000).toISOString(),
    jawaban: {}, aar: null, selesai: true, indeks: p.injects.length
  };
  p.injects.forEach((inj, i) => { sesi.jawaban[inj.id] = pola[i] || [inj.opsi[0].id]; });
  sesi.aar = gen.hitungAAR(p, sesi.jawaban);
  s.sesi.push(sesi);
  tulisStore(s);
  return s;
}

async function localApi(path, opt = {}) {
  const gen = await import('./vendor/generator.mjs');
  const dash = await import('./vendor/dashboard.mjs');
  const data = opt.body ? JSON.parse(opt.body) : {};
  let s = bacaStore();
  if (!s.paket) s.paket = [];
  if (!s.sesi) s.sesi = [];
  if (!s.seeded) s = seedDemo(gen);

  if (path === '/api/meta') return gen.daftarKombinasi();

  if (path === '/api/generate') {
    const p = gen.bangkitkanPaket(data);
    s.paket.push(p);
    if (s.paket.length > 60) s.paket = s.paket.slice(-60);
    tulisStore(s);
    return p;
  }

  if (path === '/api/packages') {
    return s.paket.slice(-20).reverse().map((p) => ({
      id: p.id, nama: p.meta.nama, satuan: p.meta.satuan.nama, aktor: p.meta.aktor.nama,
      level: p.meta.levelNama, dibuat: p.dibuat, inject: p.injects.length
    }));
  }

  if (path === '/api/reset') { tulisStore({ paket: [], sesi: [], seeded: true }); return { ok: true }; }

  const mPkt = path.match(/^\/api\/package\/([A-Z0-9-]+)$/);
  if (mPkt) {
    const p = s.paket.find((x) => x.id === mPkt[1]);
    if (!p) throw new Error('Paket tidak ditemukan');
    return p;
  }

  if (path === '/api/session') {
    const p = s.paket.find((x) => x.id === data.packageId);
    if (!p) throw new Error('Paket tidak ditemukan');
    const sesi = {
      id: idBaru('SES'), paketId: p.id, paketSatuan: p.meta.satuan.id,
      satuanNama: p.meta.satuan.nama, aktorNama: p.meta.aktor.nama, level: p.meta.levelNama,
      tim: (data.tim || 'Tim Latihan').slice(0, 60), mulai: new Date().toISOString(),
      jawaban: {}, aar: null, selesai: false, indeks: 0
    };
    s.sesi.push(sesi); tulisStore(s);
    return { sesi, paket: p };
  }

  const mJawab = path.match(/^\/api\/session\/([A-Z0-9-]+)\/jawab$/);
  if (mJawab) {
    const sesi = s.sesi.find((x) => x.id === mJawab[1]);
    const p = s.paket.find((x) => x.id === sesi.paketId);
    const inj = p.injects.find((x) => x.id === data.injectId);
    const dipilih = (data.opsi || []).filter((o) => inj.opsi.some((x) => x.id === o));
    sesi.jawaban[inj.id] = dipilih;
    sesi.indeks = Math.min(sesi.indeks + 1, p.injects.length);
    tulisStore(s);
    const umpan = inj.opsi.filter((o) => dipilih.includes(o.id)).map((o) => ({ teks: o.teks, umpan: o.umpan, baik: o.baik }));
    const skor = { deteksi: 0, containment: 0, eradikasi: 0, forensik: 0, pelaporan: 0, komando: 0 };
    inj.opsi.filter((o) => dipilih.includes(o.id)).forEach((o) => Object.keys(skor).forEach((k) => { skor[k] += o.skor[k] || 0; }));
    return { sesi, umpan, skor };
  }

  const mSelesai = path.match(/^\/api\/session\/([A-Z0-9-]+)\/selesai$/);
  if (mSelesai) {
    const sesi = s.sesi.find((x) => x.id === mSelesai[1]);
    const p = s.paket.find((x) => x.id === sesi.paketId);
    sesi.aar = gen.hitungAAR(p, sesi.jawaban);
    sesi.selesai = true;
    sesi.selesaiPada = new Date().toISOString();
    tulisStore(s);
    return { sesi, aar: sesi.aar, paket: p };
  }

  const mSesi = path.match(/^\/api\/session\/([A-Z0-9-]+)$/);
  if (mSesi) {
    const sesi = s.sesi.find((x) => x.id === mSesi[1]);
    if (!sesi) throw new Error('Sesi tidak ditemukan');
    return { sesi, paket: s.paket.find((x) => x.id === sesi.paketId) };
  }

  if (path === '/api/dashboard') return dash.buatDashboard(s);

  throw new Error('Rute tidak dikenal: ' + path);
}

const api = async (path, opt) => {
  if (MODE === 'local') return localApi(path, opt);
  const r = await fetch(path, opt);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Permintaan gagal');
  return j;
};
const post = (path, data) => api(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data || {}) });
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = (n) => Math.max(0, Math.min(100, Math.round(n)));
const warna = (n) => (n >= 80 ? 'var(--green)' : n >= 65 ? 'var(--amber)' : 'var(--red)');
const statusPill = (s) => {
  const c = s === 'SIAP' ? 'g' : s === 'CUKUP' ? 'a' : 'r';
  return `<span class="pill ${c}">${s}</span>`;
};

function setNav(path) {
  const alur = /^\/(paket|latihan|aar)/.test(path);
  document.querySelectorAll('#nav a').forEach((a) => {
    const aktif = a.dataset.r === path || (alur && a.dataset.r === '/forge');
    a.classList.toggle('on', aktif);
  });
}

/* ---------------- SVG ---------------- */
function gauge(nilai, grade) {
  const r = 52, c = 2 * Math.PI * r, off = c - (c * nilai) / 100;
  return `<div class="gauge-wrap">
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="${r}" fill="none" stroke="#16241d" stroke-width="8"/>
      <circle cx="70" cy="70" r="${r}" fill="none" stroke="${warna(nilai)}" stroke-width="8"
        stroke-dasharray="${c}" stroke-dashoffset="${off}" stroke-linecap="round"
        transform="rotate(-90 70 70)"/>
      <text x="70" y="72" text-anchor="middle" font-family="var(--mono)" font-size="30" fill="#e8f0ea">${nilai}</text>
      <text x="70" y="90" text-anchor="middle" font-family="var(--mono)" font-size="8" fill="#5f776c" letter-spacing="2">READINESS</text>
    </svg>
    <div class="pill ${nilai >= 80 ? 'g' : nilai >= 65 ? 'a' : 'r'}" style="margin-top:8px">${grade}</div>
  </div>`;
}

function radar(items, size = 320) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 54;
  const n = items.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + Math.cos(a) * r * (v / 100), cy + Math.sin(a) * r * (v / 100)];
  };
  let rings = '';
  [25, 50, 75, 100].forEach((v) => {
    const p = items.map((_, i) => pt(i, v).join(',')).join(' ');
    rings += `<polygon points="${p}" fill="none" stroke="#1c2b24" stroke-width="1"/>`;
  });
  let spokes = '';
  items.forEach((_, i) => {
    const [x, y] = pt(i, 100);
    spokes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#1c2b24"/>`;
  });
  const poly = items.map((it, i) => pt(i, it.nilai).join(',')).join(' ');
  const dots = items.map((it, i) => {
    const [x, y] = pt(i, it.nilai);
    return `<circle cx="${x}" cy="${y}" r="3" fill="#57e08c"/>`;
  }).join('');
  const labels = items.map((it, i) => {
    const [x, y] = pt(i, 118);
    return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle">${esc(it.nama.toUpperCase())}</text>`;
  }).join('');
  return `<svg class="radar" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${rings}${spokes}
    <polygon points="${poly}" fill="rgba(87,224,140,0.16)" stroke="#57e08c" stroke-width="1.6"/>
    ${dots}${labels}
  </svg>`;
}

function topoSVG(t) {
  const tiers = [...new Set(t.nodes.map((n) => n.tier))].sort((a, b) => a - b);
  const byTier = tiers.map((ti) => t.nodes.filter((n) => n.tier === ti));
  const maxRows = Math.max(...byTier.map((a) => a.length));
  const colW = 186, gapY = 62, padX = 20, padY = 26, boxW = 146, boxH = 40;
  const W = tiers.length * colW + padX * 2;
  const H = maxRows * gapY + padY * 2 + 10;
  const pos = {};
  byTier.forEach((arr, ti) => {
    const offset = (maxRows - arr.length) * (gapY / 2);
    arr.forEach((n, i) => {
      pos[n.id] = { x: padX + ti * colW, y: padY + offset + i * gapY, n };
    });
  });
  const warnaNode = { zona: '#6bb6ff', jaringan: '#e3b45c', server: '#57e08c', ot: '#ff6a58', host: '#8fa79a', periferal: '#5f776c' };
  let links = '';
  t.links.forEach(([a, b]) => {
    const A = pos[a], B = pos[b];
    if (!A || !B) return;
    const x1 = A.x + boxW, y1 = A.y + boxH / 2, x2 = B.x, y2 = B.y + boxH / 2;
    const mx = (x1 + x2) / 2;
    links += `<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" fill="none" stroke="#2a4438" stroke-width="1.2"/>`;
  });
  let nodes = '';
  Object.values(pos).forEach(({ x, y, n }) => {
    const c = warnaNode[n.tipe] || '#8fa79a';
    nodes += `<g>
      <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" fill="#0f1815" stroke="${c}" stroke-opacity="0.55"/>
      <rect x="${x}" y="${y}" width="2" height="${boxH}" fill="${c}"/>
      <text x="${x + 10}" y="${y + 17}" font-family="var(--mono)" font-size="9.5" fill="#e8f0ea">${esc(n.label.slice(0, 20))}</text>
      <text x="${x + 10}" y="${y + 30}" font-family="var(--mono)" font-size="8" fill="#5f776c">${esc(n.aset.slice(0, 24))}</text>
    </g>`;
  });
  return `<svg width="100%" viewBox="0 0 ${W} ${H}" style="max-width:${W}px">${links}${nodes}</svg>`;
}


function arsitekturSVG() {
  const box = (x, y, w, h, label, sub, warna) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f1815" stroke="${warna}" stroke-opacity=".5"/>
    <rect x="${x}" y="${y}" width="2" height="${h}" fill="${warna}"/>
    <text x="${x + 11}" y="${y + 19}" font-family="var(--mono)" font-size="10.5" fill="#e8f0ea">${label}</text>
    <text x="${x + 11}" y="${y + 33}" font-family="var(--mono)" font-size="9" fill="#7f978a">${sub}</text>`;
  const panah = (x1, x2, y) => `<path d="M${x1},${y} H${x2 - 7}" stroke="#3f6352" stroke-width="1.6"/><path d="M${x2 - 9},${y - 3.5} L${x2},${y} L${x2 - 9},${y + 3.5} Z" fill="#2a4438"/>`;
  return `<svg width="100%" viewBox="0 0 860 250" style="max-width:860px">
    <text x="20" y="20" font-family="var(--mono)" font-size="9" fill="#5f776c" letter-spacing="2">01 INPUT</text>
    <text x="228" y="20" font-family="var(--mono)" font-size="9" fill="#5f776c" letter-spacing="2">02 MESIN PEMBANGKIT</text>
    <text x="436" y="20" font-family="var(--mono)" font-size="9" fill="#5f776c" letter-spacing="2">03 PAKET LATIHAN</text>
    <text x="648" y="20" font-family="var(--mono)" font-size="9" fill="#5f776c" letter-spacing="2">04 PELAKSANA &amp; PENILAIAN</text>
    ${box(20, 38, 168, 44, 'PROFIL SATUAN', 'aset · personel · paparan', '#6bb6ff')}
    ${box(20, 92, 168, 44, 'AKTOR ANCAMAN', 'kill chain · ATT&CK', '#6bb6ff')}
    ${box(20, 146, 168, 44, 'TINGKAT KESULITAN', 'dasar · menengah · lanjut', '#6bb6ff')}
    ${panah(190, 224, 115)}
    <rect x="226" y="38" width="172" height="152" fill="rgba(87,224,140,.05)" stroke="#57e08c" stroke-opacity=".55"/>
    <text x="238" y="60" font-family="var(--mono)" font-size="10.5" fill="#57e08c">AGENTIC</text>
    <text x="238" y="76" font-family="var(--mono)" font-size="10.5" fill="#e8f0ea">PIPELINE</text>
    <text x="238" y="100" font-family="var(--mono)" font-size="9" fill="#7f978a">topologi &amp; zona</text>
    <text x="238" y="116" font-family="var(--mono)" font-size="9" fill="#7f978a">rantai serangan</text>
    <text x="238" y="132" font-family="var(--mono)" font-size="9" fill="#7f978a">inject keputusan</text>
    <text x="238" y="148" font-family="var(--mono)" font-size="9" fill="#7f978a">rubrik penilaian</text>
    <text x="238" y="164" font-family="var(--mono)" font-size="9" fill="#7f978a">panduan fasilitator</text>
    ${panah(400, 434, 115)}
    ${box(436, 38, 176, 44, 'SKENARIO', 'narasi Bahasa Indonesia', '#57e08c')}
    ${box(436, 92, 176, 44, 'INJECT &amp; OPSI', '3–4 keputusan per inject', '#57e08c')}
    ${box(436, 146, 176, 44, 'KUNCI &amp; RUBRIK', '6 kompetensi berbobot', '#57e08c')}
    ${panah(614, 646, 115)}
    ${box(648, 38, 192, 44, 'MODE TABLETOP', 'tanpa jaringan', '#e3b45c')}
    ${box(648, 92, 192, 44, 'MODE LAB', 'Docker terisolasi', '#e3b45c')}
    ${box(648, 146, 192, 44, 'INDEKS KESIAPAN', 'AAR · radar · rekomendasi', '#e3b45c')}
    <rect x="20" y="206" width="820" height="30" fill="#0b1210" stroke="#1c2b24"/>
    <text x="34" y="225" font-family="var(--mono)" font-size="9" fill="#7f978a">PENYIMPANAN LOKAL SATUAN</text>
    <text x="250" y="225" font-family="var(--mono)" font-size="9" fill="#5f776c">berkas JSON · tanpa sinkronisasi otomatis · dapat ditandatangani antar-satuan</text>
    <text x="700" y="225" font-family="var(--mono)" font-size="9" fill="#57e08c">TANPA CLOUD</text>
  </svg>`;
}

/* ---------------- Papan Komando ---------------- */
async function viewDeck() {
  app.innerHTML = `<div class="wrap"><div class="dim mono" style="padding:40px 0">memuat papan komando…</div></div>`;
  const d = await api('/api/dashboard');
  state.dash = d;
  const maxKomp = Math.max(...d.kompetensi.map((k) => k.nilai));
  app.innerHTML = `
  <div class="wrap">
    <div class="hero">
      <div>
        <div class="eyebrow">Platform Latihan Kesiapan Siber // PUSSIBERAD</div>
        <h1>Pertahanan siber tidak kekurangan alat.<br>Ia kekurangan <em>prajurit terlatih</em>.</h1>
        <p class="lead">LATMA SIBER membangkitkan paket latihan siber lengkap dalam hitungan detik — skenario, topologi, inject keputusan, rubrik penilaian, dan panduan fasilitator — lalu mengukur kesiapan setiap personel dan satuan.</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#/forge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h7l-1 8 11-14h-7z"/></svg>
            Bangkitkan Paket Latihan
          </a>
          <a class="btn btn-lg btn-ghost" href="#/tentang">Lihat Arsitektur</a>
        </div>
        <div class="hero-facts">
          <div class="hero-fact"><b>${d.rata}</b><span>Indeks Kesiapan Nasional</span></div>
          <div class="hero-fact"><b>${d.unit.length}</b><span>Satuan Dipantau</span></div>
          <div class="hero-fact"><b>${d.totalLatihan}</b><span>Paket Dibangkitkan</span></div>
          <div class="hero-fact"><b>${d.sesiSelesai}</b><span>Latihan Selesai</span></div>
        </div>
      </div>
      <div class="hero-panel">
        <div class="panel-label">// MESIN PEMBANGKIT SKENARIO</div>
        <div class="mini-log">
          <div><span class="dim">$</span> latma bangkitkan --satuan poslog --aktor ransomware</div>
          <div><span class="ok">[OK]</span> profil satuan · 42 personel · 6 aset kritis</div>
          <div><span class="ok">[OK]</span> topologi · 6 node · 3 zona</div>
          <div><span class="ok">[OK]</span> teknik ATT&CK · 9 terpetakan</div>
          <div><span class="ok">[OK]</span> inject keputusan · 7 skenario</div>
          <div><span class="ok">[OK]</span> rubrik · 6 kompetensi</div>
          <div><span class="warn">[!]</span> aset OT terdeteksi · mode aman aktif</div>
          <div style="margin-top:10px"><span class="ok">PAKET SIAP</span> <span class="dim">· 0,4 detik</span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2>Kesiapan per Satuan</h2><div class="line"></div><span class="mono dim" style="font-size:10px">DATA CONTOH + SESI NYATA</span></div>
      <div class="card" style="padding:4px 6px">
        <table class="ready-table">
          <thead><tr><th>Satuan</th><th>Lokasi</th><th style="width:34%">Indeks Kesiapan</th><th>Tren</th><th>Status</th><th></th></tr></thead>
          <tbody>
          ${d.unit.map((u) => `
            <tr>
              <td><div class="unit-name">${esc(u.nama)}</div><div class="unit-sub">${esc(u.jenis)} · ${u.personel} personel</div></td>
              <td class="dim" style="font-size:12px">${esc(u.lokasi)}</td>
              <td><div class="meter"><div class="meter-bar"><i style="width:${u.readiness}%;background:${warna(u.readiness)}"></i></div><b>${u.readiness}</b></div></td>
              <td class="mono ${u.tren >= 0 ? 'up' : 'down'}" style="font-size:11px">${u.tren >= 0 ? '▲' : '▼'} ${Math.abs(u.tren)}</td>
              <td>${statusPill(u.status)}</td>
              <td><a class="btn btn-ghost" style="height:26px;padding:0 10px;font-size:11px" href="#/forge" data-unit="${u.id}">Latih</a></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="section grid-2">
      <div class="card card-pad">
        <div class="panel-label">// KOMPETENSI AGREGAT</div>
        ${d.kompetensi.map((k) => `
          <div class="comp-row">
            <div class="lbl"><span>${esc(k.nama)}</span><b style="color:${warna(k.nilai)}">${k.nilai}</b></div>
            <div class="meter-bar"><i style="width:${(k.nilai / maxKomp) * 100}%;background:${warna(k.nilai)}"></i></div>
          </div>`).join('')}
      </div>
      <div class="card card-pad">
        <div class="panel-label">// SESI TERAKHIR</div>
        ${d.sesiTerakhir.length ? d.sesiTerakhir.map((s) => `
          <a href="#/aar/${esc(s.id)}" style="display:flex;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid rgba(28,43,36,.6);text-decoration:none;color:inherit">
            <div style="flex:1">
              <div style="font-size:12.5px;font-weight:550">${esc(s.tim)}</div>
              <div class="dim" style="font-size:10.5px">${esc(s.satuan)} · ${esc(s.aktor)} · ${esc(s.level)}</div>
            </div>
            <div class="mono" style="font-size:16px;color:${warna(s.readiness || 0)}">${s.readiness ?? '—'}</div>
            <div class="dim" style="font-size:12px">→</div>
          </a>`).join('') : `<div class="dim" style="font-size:12.5px;padding:10px 0">Belum ada sesi. Jalankan latihan pertama untuk mengisi data nyata.</div>`}
        <a class="btn" style="margin-top:16px;width:100%" href="#/forge">Mulai Latihan Baru</a>
      </div>
    </div>

    <div class="section card card-pad" style="display:flex;gap:22px;align-items:center;flex-wrap:wrap;border-color:var(--line-2)">
      <div style="flex:1;min-width:280px">
        <div class="eyebrow" style="margin-bottom:6px">TANPA INTERNET // TANPA CLOUD</div>
        <h2 style="margin-bottom:6px">Seluruh latihan berjalan di satu laptop satuan.</h2>
        <p class="muted" style="font-size:13px">Tidak ada data yang keluar. Mode tabletop bahkan tidak memerlukan jaringan sama sekali.</p>
      </div>
      <a class="btn btn-primary" href="#/forge">Coba Sekarang →</a>
    </div>
  </div>`;
  document.querySelectorAll('[data-unit]').forEach((el) => {
    el.addEventListener('click', () => { state.pilih.satuan = el.dataset.unit; });
  });
}

/* ---------------- Forge ---------------- */
async function viewForge() {
  const meta = state.meta || await api('/api/meta');
  state.meta = meta;
  const p = state.pilih;
  app.innerHTML = `
  <div class="wrap">
    <div class="eyebrow">Mesin Pembangkit Skenario // Agentic</div>
    <h1 style="max-width:720px">Bangkitkan paket latihan dalam <em>empat detik</em>.</h1>
    <p class="lead">Pilih profil satuan, aktor ancaman, dan tingkat kesulitan. Mesin menyusun topologi, rantai serangan, inject keputusan, rubrik penilaian, dan panduan fasilitator — semuanya dalam Bahasa Indonesia.</p>

    <div class="section">
      <div class="section-head"><h2 style="font-size:15px">01 · Profil Satuan</h2><div class="line"></div><span class="mono dim" style="font-size:10px">${meta.satuan.length} PROFIL</span></div>
      <div class="forge-grid">
        ${meta.satuan.map((s) => `
          <button class="pick ${p.satuan === s.id ? 'on' : ''}" data-g="satuan" data-v="${s.id}">
            <b>${esc(s.nama)}</b>
            <span>${esc(s.jenis)}<br>${s.personel} personel · ${esc(s.lokasi)}</span>
            <span class="tag">${s.ot ? 'IT + OT' : 'IT'}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2 style="font-size:15px">02 · Aktor Ancaman</h2><div class="line"></div><span class="mono dim" style="font-size:10px">${meta.aktor.length} PROFIL</span></div>
      <div class="forge-grid">
        ${meta.aktor.map((a) => `
          <button class="pick ${p.aktor === a.id ? 'on' : ''}" data-g="aktor" data-v="${a.id}">
            <b>${esc(a.nama)}</b>
            <span>${esc(a.jenis)}<br>${esc(a.ciri)}</span>
            <span class="tag">KEMAMPUAN: ${esc(a.kemampuan.toUpperCase())}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2 style="font-size:15px">03 · Tingkat Kesulitan</h2><div class="line"></div></div>
      <div class="grid-3">
        ${meta.level.map((l) => `
          <button class="pick ${p.level === l.id ? 'on' : ''}" data-g="level" data-v="${l.id}">
            <b>${esc(l.nama)}</b>
            <span>${l.inject} inject keputusan · ${l.menit} menit<br>${l.personel} peserta</span>
            <span class="tag">${l.id === 'dasar' ? 'TANPA PRASYARAT TEKNIS' : l.id === 'menengah' ? 'PERLU PEMAHAMAN DASAR' : 'UNTUK TIM SIber SATUAN'}</span>
          </button>`).join('')}
      </div>
    </div>

    <div class="forge-bar">
      <div style="flex:1">
        <div class="sel">SATUAN <b>${esc(meta.satuan.find((s) => s.id === p.satuan).nama)}</b></div>
        <div class="sel">AKTOR <b>${esc(meta.aktor.find((a) => a.id === p.aktor).nama)}</b></div>
        <div class="sel">LEVEL <b>${esc(meta.level.find((l) => l.id === p.level).nama)}</b></div>
      </div>
      <button class="btn btn-primary btn-lg" id="btnGen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h7l-1 8 11-14h-7z"/></svg>
        Bangkitkan Paket Latihan
      </button>
    </div>
  </div>`;

  document.querySelectorAll('[data-g]').forEach((el) => {
    el.addEventListener('click', () => {
      state.pilih[el.dataset.g] = el.dataset.v;
      viewForge();
    });
  });
  document.getElementById('btnGen').addEventListener('click', bangkitkan);
}

async function bangkitkan() {
  const langkah = [
    'Membaca profil satuan dan aset kritis',
    'Menyusun topologi dan zona jaringan',
    'Memetakan teknik MITRE ATT&CK',
    'Membangkitkan inject keputusan',
    'Menyusun rubrik dan panduan fasilitator',
    'Menandatangani paket latihan'
  ];
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="gen-box">
    <div class="gen-title">MESIN PEMBANGKIT // BERJALAN</div>
    ${langkah.map((l, i) => `<div class="gen-step" id="gs${i}"><span class="mark">${i + 1}</span>${l}</div>`).join('')}
    <div class="gen-track"><i id="gtrack"></i></div>
  </div>`;
  document.body.appendChild(ov);

  const req = post('/api/generate', state.pilih).catch((e) => ({ error: e.message }));
  for (let i = 0; i < langkah.length; i++) {
    const el = document.getElementById('gs' + i);
    el.classList.add('act');
    await new Promise((r) => setTimeout(r, 190 + Math.random() * 90));
    el.classList.remove('act');
    el.classList.add('done');
    document.getElementById('gtrack').style.width = `${((i + 1) / langkah.length) * 100}%`;
  }
  const hasil = await req;
  await new Promise((r) => setTimeout(r, 220));
  ov.remove();
  if (hasil.error) { alert('Gagal membangkitkan paket: ' + hasil.error); return; }
  location.hash = '#/paket/' + hasil.id;
}

/* ---------------- Paket ---------------- */
async function viewPaket(id) {
  const p = await api('/api/package/' + id);
  state.paket = p;
  const tab = state.tab;
  app.innerHTML = `
  <div class="wrap">
    <div class="pkg-head">
      <div class="pkg-title">
        <div class="eyebrow">Paket Latihan ${esc(p.id)}</div>
        <h1 style="font-size:30px">${esc(p.meta.aktor.nama)} <span class="dim" style="font-weight:400">vs</span> ${esc(p.meta.satuan.nama)}</h1>
        <div class="pkg-meta">
          <span class="pill">${esc(p.meta.levelNama)}</span>
          <span class="pill">${p.injects.length} inject</span>
          <span class="pill">${p.meta.menit} menit</span>
          <span class="pill">${esc(p.meta.personel)} peserta</span>
          <span class="pill g">${esc(p.meta.kategori)}</span>
          <span class="pill ${p.risiko && p.risiko.paparan >= 60 ? 'r' : 'a'}">PAPARAN ${p.risiko ? p.risiko.paparan : '—'}</span>
        </div>
      </div>
      <div class="btn-row no-print">
        <button class="btn btn-primary" id="btnRun">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9z"/></svg>
          Jalankan Latihan
        </button>
        <button class="btn" id="btnPrint">Cetak</button>
        <button class="btn" id="btnJson">Unduh JSON</button>
      </div>
    </div>

    <div class="tabs no-print">
      ${[['ringkasan', 'Ringkasan'], ['risiko', 'Risiko'], ['topologi', 'Topologi'], ['chain', 'Rantai Serangan'], ['inject', 'Inject (' + p.injects.length + ')'], ['rubrik', 'Rubrik'], ['fasilitator', 'Fasilitator'], ['deteksi', 'Aturan Deteksi'], ['ioc', 'Indikator']]
        .map(([k, l]) => `<button class="tab ${tab === k ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}
    </div>
    <div class="tab-body" id="tabBody">${renderTab(p, tab)}</div>
  </div>`;

  document.querySelectorAll('[data-tab]').forEach((el) => el.addEventListener('click', () => {
    state.tab = el.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach((x) => x.classList.toggle('on', x.dataset.tab === state.tab));
    document.getElementById('tabBody').innerHTML = renderTab(p, state.tab);
    pasangAksiTab();
  }));
  document.getElementById('btnPrint').addEventListener('click', () => { state.tab = 'inject'; document.getElementById('tabBody').innerHTML = renderTab(p, 'inject'); pasangAksiTab(); window.print(); });
  document.getElementById('btnJson').addEventListener('click', async () => {
    const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = p.id + '.json';
    a.click();
  });
  document.getElementById('btnRun').addEventListener('click', () => dialogMulai(p));
  pasangAksiTab();
}

function pasangAksiTab() {
  pasangAccordion();
  document.querySelectorAll('[data-sig] .inject-head').forEach((h) => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
  });
  const aturan = (state.paket && state.paket.deteksi && state.paket.deteksi.aturan) || [];
  const btnCopy = document.getElementById('btnCopyAll');
  if (btnCopy) btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(aturan.map((x) => x.yaml).join('\n---\n'));
      btnCopy.textContent = 'Tersalin ✓';
      setTimeout(() => { btnCopy.textContent = 'Salin semua'; }, 1800);
    } catch { btnCopy.textContent = 'Gagal menyalin'; }
  });
  const btnDl = document.getElementById('btnDlSigma');
  if (btnDl) btnDl.addEventListener('click', () => {
    const blob = new Blob([aturan.map((x) => x.yaml).join('\n---\n')], { type: 'text/yaml' });
    const el = document.createElement('a');
    el.href = URL.createObjectURL(blob);
    el.download = 'latma-detection-pack.yml';
    el.click();
  });
}

function renderTab(p, tab) {
  if (tab === 'ringkasan') return `
    <div class="grid-2">
      <div class="card card-pad">
        <div class="panel-label">// RINGKASAN SKENARIO</div>
        <p style="font-size:13.5px;color:var(--muted);line-height:1.75">${esc(p.ringkasan)}</p>
        <div class="panel-label" style="margin-top:22px">// TUJUAN LATIHAN</div>
        <ul class="bullets">${p.objektif.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
      </div>
      <div>
        <div class="card card-pad" style="margin-bottom:14px">
          <div class="panel-label">// DATA PAKET</div>
          <dl class="kv">
            <dt>Satuan</dt><dd>${esc(p.meta.satuan.nama)} · ${esc(p.meta.satuan.lokasi)}</dd>
            <dt>Personel</dt><dd>${p.meta.satuan.personel} orang</dd>
            <dt>Aktor</dt><dd>${esc(p.meta.aktor.nama)} (${esc(p.meta.aktor.kemampuan)})</dd>
            <dt>Motivasi</dt><dd>${esc(p.meta.aktor.motivasi)}</dd>
            <dt>Durasi</dt><dd>${p.meta.menit} menit · ${p.injects.length} inject</dd>
            <dt>Prasyarat</dt><dd>${esc(p.prasyarat[0])}</dd>
          </dl>
        </div>
        <div class="card card-pad">
          <div class="panel-label">// BIAYA PELAKSANAAN</div>
          <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed rgba(28,43,36,.7);font-size:12.5px"><span class="muted">Mode tabletop</span><b style="color:var(--green)">${esc(p.biaya.modeTabletop)}</b></div>
          <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px dashed rgba(28,43,36,.7);font-size:12.5px"><span class="muted">Mode lab terisolasi</span><b style="color:var(--green)">${esc(p.biaya.modeLab)}</b></div>
          <div style="display:flex;justify-content:space-between;padding:7px 0;font-size:12.5px"><span class="muted">Persiapan fasilitator</span><b>${esc(p.biaya.estimasiWaktuPersiapan)}</b></div>
        </div>
      </div>
    </div>`;

  if (tab === 'topologi') return `
    <div class="card card-pad">
      <div class="panel-label">// TOPOLOGI SIMULASI — ${esc(p.meta.satuan.nama.toUpperCase())}</div>
      <div style="overflow-x:auto;padding:10px 0">${topoSVG(p.topologi)}</div>
      <div class="node-legend" style="margin-top:10px">
        <span><i style="background:#6bb6ff"></i>Zona luar</span>
        <span><i style="background:#e3b45c"></i>Jaringan tepi</span>
        <span><i style="background:#57e08c"></i>Server</span>
        <span><i style="background:#ff6a58"></i>Perangkat OT</span>
        <span><i style="background:#8fa79a"></i>Workstation</span>
        <span><i style="background:#5f776c"></i>Periferal</span>
      </div>
    </div>
    <div class="card" style="margin-top:14px;padding:4px 6px">
      <table class="ready-table">
        <thead><tr><th>Node</th><th>Jenis</th><th>Perangkat / OS</th><th>Kelemahan</th><th>Catatan</th></tr></thead>
        <tbody>${p.topologi.nodes.map((n) => `
          <tr><td class="mono" style="font-size:11.5px">${esc(n.label)}</td><td class="dim" style="font-size:11.5px">${esc(n.tipe)}</td>
          <td style="font-size:11.5px">${esc(n.os)}</td><td style="font-size:11.5px;color:var(--amber)">${esc(n.risiko)}</td>
          <td class="dim" style="font-size:11.5px">${esc(n.catatan)}</td></tr>`).join('')}</tbody>
      </table>
    </div>`;

  if (tab === 'chain') return `
    <div class="card card-pad">
      <div class="panel-label">// RANTAI SERANGAN & PEMETAAN ATT&CK</div>
      <div class="chain">
        ${p.killchain.map((f) => `
          <div class="chain-row">
            <div class="chain-num">0${f.urutan}</div>
            <div class="chain-body">
              <h3>${esc(f.fase)}</h3>
              <div class="tech-list">${f.teknik.map((t) => `<span class="tech">${esc(t.id)} · ${esc(t.nama)}</span>`).join('')}</div>
              <ul class="bullets">${f.indikator.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  if (tab === 'inject') return `
    <div style="margin-bottom:12px" class="dim mono no-print" style="font-size:10.5px">KLIK UNTUK MELIHAT NARASI DAN OPSI KEPUTUSAN</div>
    ${p.injects.map((inj) => `
      <div class="inject-item" data-inj="${inj.id}">
        <div class="inject-head">
          <span class="inject-id">${inj.id}</span>
          <span class="inject-jam">${inj.jam}</span>
          <span class="inject-judul">${esc(inj.judul)}</span>
          <span class="pill">${esc(inj.kanal)}</span>
        </div>
        <div class="inject-body">
          <div class="inject-narasi">${esc(inj.narasi)}</div>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">${esc(inj.pertanyaan)}</div>
          ${inj.opsi.map((o, i) => `
            <div class="opt-row ${o.baik ? 'best' : ''}">
              <span class="k">${String.fromCharCode(65 + i)}</span>
              <span>${esc(o.teks)}${o.baik ? ' <span class="pill g" style="margin-left:6px">KUNCI</span>' : ''}</span>
            </div>`).join('')}
        </div>
      </div>`).join('')}`;

  if (tab === 'rubrik') return `
    <div class="card" style="padding:4px 6px">
      <table class="ready-table">
        <thead><tr><th>Kompetensi</th><th>Bobot</th><th>Fokus Penilaian</th><th>Sangat Baik</th></tr></thead>
        <tbody>${p.rubrik.map((r) => `
          <tr><td style="font-weight:550">${esc(r.nama)}</td><td class="mono">${r.bobot}%</td>
          <td class="dim" style="font-size:11.5px">${esc(r.deskripsi)}</td>
          <td class="dim" style="font-size:11.5px">${esc(r.kriteria[3].deskripsi)}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card card-pad" style="margin-top:14px">
      <div class="panel-label">// SKALA NILAI</div>
      <div class="grid-4">
        ${p.rubrik[0].kriteria.map((k, i) => `<div><div class="pill ${i === 3 ? 'g' : i === 2 ? 'a' : ''}">${esc(k.level)}</div><p class="dim" style="font-size:11.5px;margin-top:8px">${esc(k.deskripsi)}</p></div>`).join('')}
      </div>
    </div>`;

  if (tab === 'fasilitator') return `
    <div class="grid-2">
      ${[['Persiapan', p.fasilitator.persiapan], ['Jalankan', p.fasilitator.jalankan], ['Aturan', p.fasilitator.aturan], ['Pertanyaan Diskusi', p.fasilitator.pertanyaanDiskusi]]
        .map(([judul, arr]) => `<div class="card card-pad"><div class="panel-label">// ${judul.toUpperCase()}</div><ul class="bullets">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="card card-pad" style="margin-top:14px">
      <div class="panel-label">// PRASYARAT</div>
      <ul class="bullets">${p.prasyarat.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>`;

  if (tab === 'risiko') return `
    <div class="grid-2">
      <div class="card card-pad">
        <div class="panel-label">// INDEKS PAPARAN</div>
        <div style="display:flex;align-items:baseline;gap:14px">
          <div class="mono" style="font-size:54px;line-height:1;color:${warna(100 - p.risiko.paparan)}">${p.risiko.paparan}</div>
          <div class="dim" style="font-size:11.5px;line-height:1.5">dari 100<br>semakin tinggi, semakin mudah ditembus</div>
          <span class="pill ${p.risiko.paparan >= 70 ? 'r' : p.risiko.paparan >= 50 ? 'a' : 'g'}" style="margin-left:auto">${p.risiko.paparan >= 70 ? 'TINGGI' : p.risiko.paparan >= 50 ? 'SEDANG' : 'RENDAH'}</span>
        </div>
        <div class="meter-bar" style="margin-top:14px;height:6px"><i style="width:${p.risiko.paparan}%;background:${warna(100 - p.risiko.paparan)}"></i></div>
        <p class="dim" style="font-size:11.5px;margin-top:14px;line-height:1.6">${esc(p.risiko.catatan)}</p>
      </div>
      <div class="card card-pad">
        <div class="panel-label">// TITIK KRITIS — TUTUP DI SINI</div>
        ${p.risiko.chokePoints.map((c) => `
          <div style="padding:10px 0;border-bottom:1px dashed rgba(28,43,36,.7)">
            <div class="mono" style="font-size:12.5px;color:var(--text)">${esc(c.label)}</div>
            <div class="dim" style="font-size:11px;margin-top:2px">${esc(c.tipe.toUpperCase())} · ${esc(c.risiko)}</div>
            ${(() => { const k = p.risiko.kontrol.find((x) => x.aset === c.label); return k ? `<div style="font-size:11px;color:var(--green);margin-top:5px;line-height:1.5">→ ${esc(k.teks)}</div>` : ''; })()}
          </div>`).join('')}
        <p class="dim" style="font-size:11.5px;margin-top:12px">Aset ini muncul pada sebagian besar jalur serangan. Menutup satu titik di sini memutus banyak jalur sekaligus.</p>
      </div>
    </div>

    <div class="card card-pad" style="margin-top:14px">
      <div class="panel-label">// JALUR SERANGAN PALING MUNGKIN</div>
      <div style="display:flex;gap:14px;padding:4px 0 7px;border-bottom:1px solid var(--line)">
        <div class="mono" style="width:46px;font-size:9px;color:var(--dim);letter-spacing:.14em">SKOR</div>
        <div class="mono" style="flex:1;font-size:9px;color:var(--dim);letter-spacing:.14em">JALUR</div>
        <div class="mono" style="font-size:9px;color:var(--dim);letter-spacing:.14em">TARGET</div>
      </div>
      ${p.risiko.jalur.map((j) => `
        <div style="display:flex;gap:14px;align-items:center;padding:13px 0;border-bottom:1px solid rgba(28,43,36,.6)">
          <div class="mono" style="width:46px;font-size:19px;color:${warna(100 - j.skor)}">${j.skor}</div>
          <div style="flex:1">
            <div style="font-size:12.5px;font-weight:550;line-height:1.5">${j.simpul.map((x) => esc(x)).join(' <span class="dim">→</span> ')}</div>
            <div class="dim" style="font-size:11px;margin-top:3px">${esc(j.dampak)}</div>
          </div>
          <span class="pill ${j.skor >= 60 ? 'r' : 'a'}">TARGET ${esc(j.target)}</span>
        </div>`).join('')}
    </div>

    <div class="card card-pad" style="margin-top:14px">
      <div class="panel-label">// KONTROL PRIORITAS</div>
      <div>
        ${p.risiko.kontrol.map((k, i) => `
          <div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid rgba(28,43,36,.55)">
            <div class="mono" style="font-size:11px;color:var(--green);flex:none;width:18px">0${i + 1}</div>
            <div>
              <div class="mono" style="font-size:10px;letter-spacing:.1em;color:var(--dim);margin-bottom:3px">${esc(k.aset)}</div>
              <div style="font-size:12.5px;color:var(--muted);line-height:1.55">${esc(k.teks)}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;

  if (tab === 'deteksi') return `
    <div class="card card-pad" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;border-color:var(--line-2)">
      <div style="flex:1;min-width:280px">
        <div class="panel-label">// DETECTION PACK</div>
        <h3 style="margin-bottom:6px">${p.deteksi.aturan.length} aturan Sigma siap pasang</h3>
        <p class="dim" style="font-size:12.5px;line-height:1.6">Dibangkitkan dari ${esc(p.deteksi.cakupan)} teknik ATT&CK pada skenario ini. Format Sigma dapat langsung dipakai di SIEM satuan (Wazuh, Elastic, Splunk, Sentinel).</p>
      </div>
      <div class="btn-row no-print">
        <button class="btn" id="btnCopyAll">Salin semua</button>
        <button class="btn btn-primary" id="btnDlSigma">Unduh .yml</button>
      </div>
    </div>
    ${p.deteksi.aturan.map((x, i) => `
      <div class="inject-item ${i === 0 ? 'open' : ''}" data-sig="${i}" style="margin-top:10px">
        <div class="inject-head">
          <span class="inject-id">${esc(x.teknik)}</span>
          <span class="inject-judul">${esc(x.judul)}</span>
          <span class="pill ${x.level === 'critical' ? 'r' : x.level === 'high' ? 'a' : ''}">${esc(x.level.toUpperCase())}</span>
        </div>
        <div class="inject-body" style="display:block;padding-top:0">
          <pre style="background:var(--bg);border:1px solid var(--line);padding:14px;overflow-x:auto;font-family:var(--mono);font-size:10.5px;line-height:1.6;color:var(--muted);margin-top:8px">${esc(x.yaml)}</pre>
        </div>
      </div>`).join('')}
    <p class="dim" style="font-size:11.5px;margin-top:12px">Aturan bersifat template: sesuaikan jalur log dan daftar putih dengan lingkungan satuan sebelum diterapkan.</p>`;

  if (tab === 'ioc') return `
    <div class="grid-2">
      <div class="card" style="padding:4px 6px">
        <table class="ready-table">
          <thead><tr><th>Tipe</th><th>Nilai</th><th>Keterangan</th></tr></thead>
          <tbody>${p.ioc.map((i) => `<tr><td><span class="pill">${esc(i.tipe)}</span></td><td class="mono" style="font-size:11px">${esc(i.nilai)}</td><td class="dim" style="font-size:11px">${esc(i.keterangan)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="card card-pad">
        <div class="panel-label">// TEKNIK ATT&CK TERPETAKAN (${p.mitre.length})</div>
        <div class="tech-list">${p.mitre.map((t) => `<span class="tech">${esc(t.id)} · ${esc(t.nama)}</span>`).join('')}</div>
        <p class="dim" style="font-size:11.5px;margin-top:14px">Indikator bersifat fiktif dan hanya untuk keperluan latihan. Tidak ada muatan aktif yang disertakan dalam paket ini.</p>
      </div>
    </div>`;

  return '';
}

function pasangAccordion() {
  document.querySelectorAll('[data-inj] .inject-head').forEach((h) => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('open'));
  });
}

function dialogMulai(p) {
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `<div class="gen-box card card-pad" style="width:min(430px,92vw)">
    <div class="gen-title">MULAI SESI LATIHAN</div>
    <p class="muted" style="font-size:12.5px;margin-bottom:14px">${esc(p.meta.satuan.nama)} · ${esc(p.meta.aktor.nama)} · ${esc(p.meta.levelNama)}</p>
    <label class="panel-label" for="timInput">NAMA TIM / PESERTA</label>
    <input id="timInput" value="Tim Siber ${esc(p.meta.satuan.nama)}" style="width:100%;height:40px;background:var(--bg);border:1px solid var(--line-2);color:var(--text);padding:0 12px;font-family:var(--sans);font-size:13px;outline:none;margin-bottom:16px">
    <div class="btn-row">
      <button class="btn btn-primary" id="goRun" style="flex:1">Mulai Sekarang</button>
      <button class="btn btn-ghost" id="cancelRun">Batal</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  const input = document.getElementById('timInput');
  input.focus(); input.select();
  document.getElementById('cancelRun').addEventListener('click', () => ov.remove());
  document.getElementById('goRun').addEventListener('click', async () => {
    const btn = document.getElementById('goRun');
    btn.disabled = true; btn.textContent = 'Menyiapkan…';
    const { sesi } = await post('/api/session', { packageId: p.id, tim: input.value.trim() || 'Tim Latihan' });
    ov.remove();
    location.hash = '#/latihan/' + sesi.id;
  });
}

/* ---------------- Runner ---------------- */
async function viewLatihan(id) {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
  const { sesi, paket } = await api('/api/session/' + id);
  state.sesi = sesi; state.paket = paket;
  state.idx = sesi.indeks || 0;
  state.pilihOpsi = []; state.fb = null;
  state.mulai = new Date(sesi.mulai).getTime();
  if (sesi.selesai) { location.hash = '#/aar/' + id; return; }

  app.innerHTML = `
  <div class="wrap">
    <div class="run-head">
      <div style="flex:1;min-width:240px">
        <div class="eyebrow" style="margin-bottom:6px">Sesi ${esc(sesi.id)}</div>
        <h2>${esc(sesi.tim)}</h2>
        <div class="dim" style="font-size:11.5px">${esc(sesi.satuanNama)} · ${esc(sesi.aktorNama)} · ${esc(sesi.level)}</div>
      </div>
      <div style="text-align:right">
        <div class="timer" id="timer">00:00</div>
        <div class="panel-label" style="margin:0">WAKTU BERJALAN</div>
      </div>
    </div>
    <div class="run-grid">
      <div id="injectArea"></div>
      <div class="side">
        <div class="side-head">PAPAN SKOR LANGSUNG</div>
        <div class="side-body">
          <div id="skorArea"></div>
          <div class="panel-label" style="margin-top:18px">// CATATAN KEPUTUSAN</div>
          <div class="log-list" id="logArea"><div class="dim">Belum ada keputusan.</div></div>
        </div>
      </div>
    </div>
  </div>`;

  state.timer = setInterval(() => {
    const t = Math.floor((Date.now() - state.mulai) / 1000);
    const el = document.getElementById('timer');
    if (!el) return;
    el.textContent = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    el.classList.toggle('warn', t > state.paket.meta.menit * 60);
  }, 1000);

  renderInject();
  renderSkor();
}

function renderSkor() {
  const area = document.getElementById('skorArea');
  if (!area) return;
  const komp = ['deteksi', 'containment', 'eradikasi', 'forensik', 'pelaporan', 'komando'];
  const nama = { deteksi: 'Deteksi', containment: 'Penahanan', eradikasi: 'Pemulihan', forensik: 'Forensik', pelaporan: 'Pelaporan', komando: 'Komando' };
  const total = {};
  komp.forEach((k) => { total[k] = 0; });
  const p = state.paket;
  Object.entries(state.sesi.jawaban || {}).forEach(([injId, opsi]) => {
    const inj = p.injects.find((x) => x.id === injId);
    if (!inj) return;
    opsi.forEach((oid) => {
      const o = inj.opsi.find((x) => x.id === oid);
      if (o) komp.forEach((k) => { total[k] += o.skor[k] || 0; });
    });
  });
  area.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--line)">
      <span class="mono" style="font-size:10px;color:var(--dim);letter-spacing:.14em">PROGRES INJECT</span>
      <span class="mono" style="font-size:13px;color:var(--text)">${Math.min(state.idx + (state.fb ? 0 : 1), p.injects.length)}<span class="dim">/${p.injects.length}</span></span>
    </div>` + komp.map((k) => {
    const v = Math.min(100, total[k]);
    const c = v === 0 ? 'var(--dim)' : warna(v);
    return `<div class="comp-row">
      <div class="lbl"><span>${nama[k]}</span><b style="color:${c}">${v}</b></div>
      <div class="meter-bar"><i style="width:${Math.max(v, 2)}%;background:${c}"></i></div>
    </div>`;
  }).join('');
}

function renderInject() {
  const area = document.getElementById('injectArea');
  const p = state.paket;
  const inj = p.injects[state.idx];

  if (!inj) {
    area.innerHTML = `<div class="inject-card"><div class="inject-card-body" style="text-align:center;padding:50px 24px">
      <div class="eyebrow" style="justify-content:center">SEMUA INJECT SELESAI</div>
      <h2 style="margin-bottom:10px">Waktunya After Action Review.</h2>
      <p class="muted" style="font-size:13px;max-width:420px;margin:0 auto 22px">Seluruh keputusan sudah tercatat. Sistem akan menghitung indeks kesiapan, radar kompetensi, dan rekomendasi latihan berikutnya.</p>
      <button class="btn btn-primary btn-lg" id="btnFinish">Selesaikan & Lihat AAR</button>
    </div></div>`;
    document.getElementById('btnFinish').addEventListener('click', async () => {
      const btn = document.getElementById('btnFinish');
      btn.disabled = true; btn.textContent = 'Menghitung…';
      await post(`/api/session/${state.sesi.id}/selesai`);
      location.hash = '#/aar/' + state.sesi.id;
    });
    return;
  }

  area.innerHTML = `
    <div class="inject-card">
      <div class="inject-card-top">
        <span class="kanal">${esc(inj.kanal)}</span>
        <span class="mono dim" style="font-size:10.5px">${inj.id} · ${inj.jam} · ${esc(p.meta.levelNama.toUpperCase())}</span>
      </div>
      <div class="inject-card-body">
        <h2>${esc(inj.judul)}</h2>
        <p class="inject-nar">${esc(inj.narasi)}</p>
        <div class="inject-q">${esc(inj.pertanyaan)}</div>
        <div id="opsiArea">
          ${inj.opsi.map((o) => `
            <div class="opt ${state.pilihOpsi.includes(o.id) ? 'on' : ''}" data-opt="${o.id}">
              <div class="opt-box">${state.pilihOpsi.includes(o.id) ? '✓' : ''}</div>
              <div class="opt-text">${esc(o.teks)}</div>
            </div>`).join('')}
        </div>
        <div id="fbArea">${state.fb ? renderFb() : ''}</div>
        <div class="btn-row" style="margin-top:18px" id="aksiArea">
          ${state.fb
            ? `<button class="btn btn-primary" id="btnNext">Inject Berikutnya →</button>`
            : `<button class="btn btn-primary" id="btnKirim" ${state.pilihOpsi.length ? '' : 'disabled'}>Kirim Keputusan</button>
               <span class="mono" style="font-size:11px;align-self:center;color:${state.pilihOpsi.length ? 'var(--green)' : 'var(--dim)'}">${state.pilihOpsi.length}/2 TINDAKAN DIPILIH</span>`}
        </div>
      </div>
    </div>`;

  if (!state.fb) {
    document.querySelectorAll('[data-opt]').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.dataset.opt;
        if (state.pilihOpsi.includes(id)) state.pilihOpsi = state.pilihOpsi.filter((x) => x !== id);
        else if (state.pilihOpsi.length < 2) state.pilihOpsi.push(id);
        renderInject();
      });
    });
    document.getElementById('btnKirim').addEventListener('click', kirimJawaban);
  } else {
    document.getElementById('btnNext').addEventListener('click', () => {
      state.fb = null; state.pilihOpsi = []; state.idx += 1;
      renderInject(); renderSkor(); renderLog();
    });
  }
  renderLog();
}

function renderFb() {
  return `<div class="feedback">
    <div class="panel-label" style="margin-bottom:8px">// UMPAN BALIK FASILITATOR</div>
    ${state.fb.umpan.map((u) => `<div class="fb-row"><span class="${u.baik ? 'fb-ok' : 'fb-no'}">${u.baik ? 'TEPAT' : 'KURANG'}</span><span>${esc(u.umpan)}</span></div>`).join('')}
  </div>`;
}

async function kirimJawaban() {
  const inj = state.paket.injects[state.idx];
  const btn = document.getElementById('btnKirim');
  btn.disabled = true; btn.textContent = 'Menyimpan…';
  const r = await post(`/api/session/${state.sesi.id}/jawab`, { injectId: inj.id, opsi: state.pilihOpsi });
  state.sesi = r.sesi;
  state.fb = { umpan: r.umpan, skor: r.skor };
  renderInject(); renderSkor();
}

function renderLog() {
  const el = document.getElementById('logArea');
  if (!el) return;
  const p = state.paket;
  const entri = Object.entries(state.sesi.jawaban || {});
  if (!entri.length) { el.innerHTML = '<div class="dim">Belum ada keputusan.</div>'; return; }
  el.innerHTML = entri.map(([injId, opsi]) => {
    const inj = p.injects.find((x) => x.id === injId);
    const baik = opsi.every((o) => inj.opsi.find((x) => x.id === o)?.baik);
    return `<div><span class="${baik ? 'up' : 'down'}">${baik ? '✓' : '•'}</span> ${injId} ${esc(inj.judul.slice(0, 34))}${inj.judul.length > 34 ? '…' : ''}</div>`;
  }).join('');
}

/* ---------------- AAR ---------------- */
async function viewAAR(id) {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
  const { sesi, paket } = await api('/api/session/' + id);
  if (!sesi.aar) { location.hash = '#/latihan/' + id; return; }
  const a = sesi.aar;
  app.innerHTML = `
  <div class="wrap">
    <div class="eyebrow">After Action Review // ${esc(sesi.id)}</div>
    <div class="pkg-head" style="margin-bottom:8px">
      <div class="pkg-title">
        <h1 style="font-size:30px">${esc(sesi.tim)}</h1>
        <div class="dim" style="font-size:12.5px;margin-top:6px">${esc(sesi.satuanNama)} · ${esc(sesi.aktorNama)} · ${esc(sesi.level)} · ${a.dijawab}/${a.jumlahInject} inject dijawab</div>
      </div>
      <div class="btn-row no-print">
        <button class="btn" id="btnPrintAar">Cetak AAR</button>
        <a class="btn btn-primary" href="#/forge">Latihan Lagi</a>
      </div>
    </div>

    <div class="card card-pad" style="margin-top:22px">
      <div class="aar-hero">
        ${gauge(a.readiness, a.grade)}
        <div class="radar-wrap">${radar(a.skorKompetensi)}</div>
        <div>
          <div class="panel-label">// RINGKASAN SESI</div>
          <dl class="kv" style="grid-template-columns:1fr auto;gap:7px 10px;font-size:12px">
            <dt>Inject</dt><dd style="text-align:right">${a.dijawab}/${a.jumlahInject}</dd>
            <dt>Tingkat</dt><dd style="text-align:right">${esc(sesi.level)}</dd>
            <dt>Satuan</dt><dd style="text-align:right;font-size:11.5px">${esc(sesi.satuanNama)}</dd>
            <dt>Status</dt><dd style="text-align:right"><span class="pill ${a.readiness >= 80 ? 'g' : a.readiness >= 65 ? 'a' : 'r'}">${a.grade}</span></dd>
            ${a.paparan !== null ? `<dt>Paparan</dt><dd style="text-align:right">${a.paparan}</dd>
            <dt>Risiko bersih</dt><dd style="text-align:right;color:var(--green)">${a.risikoBersih}</dd>` : ''}
          </dl>
          ${a.paparan !== null ? `<div style="margin-top:14px;padding:10px 12px;border:1px solid var(--line);background:rgba(87,224,140,.05);font-size:11.5px;line-height:1.55;color:var(--muted)">Tanpa latihan, risiko bersih satuan ini <b style="color:var(--text)">${a.paparan}</b>. Setelah sesi ini turun ke <b style="color:var(--green)">${a.risikoBersih}</b>.</div>` : ''}
          <div class="panel-label" style="margin-top:18px">// CATATAN</div>
          <p class="dim" style="font-size:11.5px;line-height:1.6">Nilai dihitung dari bobot enam kompetensi. Sesi tersimpan lokal di perangkat satuan.</p>
        </div>
      </div>
    </div>

    <div class="section grid-2">
      <div class="card card-pad">
        <div class="panel-label">// KEKUATAN</div>
        ${a.kuat.map((k) => `<div class="aar-item" style="border-left-color:var(--green)"><h3>${esc(k.nama)} · ${k.nilai}</h3><p>${esc(k.deskripsi)}. Pertahankan sebagai penopang tim.</p></div>`).join('')}
        <div class="panel-label" style="margin-top:18px">// AREA PERBAIKAN</div>
        ${a.lemah.map((k) => `<div class="aar-item" style="border-left-color:var(--red)"><h3>${esc(k.nama)} · ${k.nilai}</h3><p>${esc(k.deskripsi)} — titik terlemah pada sesi ini.</p></div>`).join('')}
      </div>
      <div class="card card-pad">
        <div class="panel-label">// REKOMENDASI LATIHAN</div>
        ${a.rekomendasi.map((r) => `<div class="aar-item" style="border-left-color:var(--amber)"><h3>${esc(r.kompetensi)} · ${r.nilai}</h3><p>${esc(r.saran)}</p></div>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-head"><h2 style="font-size:16px">Linimasa Keputusan</h2><div class="line"></div></div>
      <div class="card card-pad">
        ${a.rincian.map((r) => `
          <div class="tl-row">
            <div class="tl-jam">${esc(r.id)}</div>
            <div>
              <div style="display:flex;align-items:center;gap:9px;margin-bottom:5px">
                <span class="tl-title" style="margin:0">${esc(r.judul)}</span>
                <span class="pill ${r.status === 'TEPAT' ? 'g' : r.status === 'SEBAGIAN' ? 'a' : 'r'}">${r.status}</span>
              </div>
              <div class="mono" style="font-size:9px;letter-spacing:.14em;color:var(--dim);margin-bottom:3px">PILIHAN ANDA</div>
              <div class="tl-ans">${r.dipilih.length ? r.dipilih.map((x) => '→ ' + esc(x)).join('<br>') : '<span class="dim">tidak dijawab</span>'}</div>
              ${r.status !== 'TEPAT' && r.terbaik.length ? `<div class="tl-best"><span class="mono" style="font-size:9px;letter-spacing:.14em;opacity:.8">KUNCI JAWABAN — </span>${esc(r.terbaik.join(' / '))}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="section card card-pad" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:260px">
        <div class="panel-label">// REKOMENDASI SISTEM</div>
        <p class="muted" style="font-size:13px">Ulangi skenario ini dalam 30 hari dengan tingkat kesulitan lebih tinggi, lalu bandingkan indeks kesiapan. Data tersimpan lokal di perangkat satuan.</p>
      </div>
      <div class="btn-row no-print">
        <a class="btn" href="#/">Papan Komando</a>
        <a class="btn btn-primary" href="#/forge">Bangkitkan Skenario Baru</a>
      </div>
    </div>
  </div>`;
  document.getElementById('btnPrintAar').addEventListener('click', () => window.print());
}

/* ---------------- Tentang ---------------- */
function viewTentang() {
  app.innerHTML = `
  <div class="wrap wrap-narrow">
    <div class="eyebrow">Arsitektur & Kesesuaian Kebutuhan</div>
    <h1 style="font-size:36px">Dibangun untuk satuan,<br>bukan untuk pusat data.</h1>
    <p class="lead">LATMA SIBER dirancang dengan tiga asumsi keras: koneksi tidak selalu ada, personel TI terbatas, dan data tidak boleh keluar dari lingkungan satuan.</p>

    <div class="section">
      <div class="section-head"><h2>Masalah yang diselesaikan</h2><div class="line"></div></div>
      <div class="grid-3">
        <div class="card card-pad"><div class="panel-label">01</div><h3 style="margin-bottom:6px">Latihan terlalu mahal</h3><p class="muted" style="font-size:12.5px">Menyusun satu skenario latihan manual butuh berhari-hari dan keahlian khusus. Akibatnya latihan jarang dilakukan.</p></div>
        <div class="card card-pad"><div class="panel-label">02</div><h3 style="margin-bottom:6px">Kesiapan tidak terukur</h3><p class="muted" style="font-size:12.5px">Tanpa penilaian terstruktur, pimpinan tidak punya angka untuk menentukan siapa perlu dilatih apa.</p></div>
        <div class="card card-pad"><div class="panel-label">03</div><h3 style="margin-bottom:6px">Solusi butuh internet</h3><p class="muted" style="font-size:12.5px">Sebagian besar platform latihan berbasis cloud. Di banyak satuan, koneksi terbatas dan data tidak boleh keluar.</p></div>
      </div>
    </div>

    <div class="section card card-pad">
      <div class="panel-label">// ARSITEKTUR</div>
      <div style="overflow-x:auto;padding:4px 0">${arsitekturSVG()}</div>
      <p class="dim" style="font-size:11.5px;margin-top:10px">Seluruh tahap berjalan di satu perangkat. Tidak ada panggilan API ke layanan luar pada mode operasi normal.</p>
    </div>

    <div class="section grid-2">
      <div class="card card-pad">
        <div class="panel-label">// KEDAULATAN DATA</div>
        <ul class="bullets">
          <li>Berjalan penuh di satu laptop atau mini-PC satuan.</li>
          <li>Tidak ada panggilan API ke layanan luar pada mode operasi normal.</li>
          <li>Paket latihan dapat ditandatangani dan diverifikasi antar-satuan.</li>
          <li>Data hasil latihan disimpan lokal, ekspor manual bila diperlukan.</li>
        </ul>
      </div>
      <div class="card card-pad">
        <div class="panel-label">// ROADMAP ADOPSI</div>
        <ul class="bullets">
          <li><b>Fase 1 (0–3 bulan):</b> tabletop di 5 satuan percontohan, tanpa biaya perangkat.</li>
          <li><b>Fase 2 (3–9 bulan):</b> papan kesiapan tingkat pusat, perpustakaan skenario bersama.</li>
          <li><b>Fase 3 (9–18 bulan):</b> mode lab terisolasi dan sertifikasi kompetensi personel.</li>
        </ul>
      </div>
    </div>

    <div class="section card card-pad">
      <div class="panel-label">// PEMETAAN KRITERIA PENILAIAN</div>
      <table class="ready-table">
        <thead><tr><th>Kriteria</th><th>Bobot</th><th>Bagaimana dipenuhi</th></tr></thead>
        <tbody>
          <tr><td>Relevansi & manfaat</td><td class="mono">25%</td><td class="dim" style="font-size:12px">Langsung menjawab kebutuhan pembinaan personel siber dan pengukuran kesiapan satuan IT/OT.</td></tr>
          <tr><td>Inovasi teknis</td><td class="mono">25%</td><td class="dim" style="font-size:12px">Pembangkit skenario agentic yang menghasilkan paket latihan lengkap, bukan kuis statis.</td></tr>
          <tr><td>Fungsionalitas purwarupa</td><td class="mono">25%</td><td class="dim" style="font-size:12px">Dapat dibangkitkan, dijalankan, dinilai, dan dilaporkan dalam satu alur utuh.</td></tr>
          <tr><td>Kelayakan implementasi</td><td class="mono">15%</td><td class="dim" style="font-size:12px">Tanpa perangkat tambahan, tanpa internet, siap dipakai minggu pertama.</td></tr>
          <tr><td>Kualitas dokumentasi</td><td class="mono">10%</td><td class="dim" style="font-size:12px">Paket latihan dapat diekspor, dicetak, dan diaudit; panduan fasilitator lengkap.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section card card-pad">
      <div class="panel-label">// SPESIFIKASI MINIMUM</div>
      <dl class="kv">
        <dt>Mode tabletop</dt><dd>1 laptop, peramban modern, tanpa jaringan</dd>
        <dt>Mode lab</dt><dd>1 host dengan Docker, 8 GB RAM, jaringan terisolasi</dd>
        <dt>Penyimpanan</dt><dd>&lt; 200 MB untuk 60 paket latihan</dd>
        <dt>Bahasa</dt><dd>Indonesia, istilah teknis dipertahankan</dd>
      </dl>
    </div>
  </div>`;
}

/* ---------------- Router ---------------- */
async function route() {
  const path = (location.hash.replace(/^#/, '') || '/').split('?')[0];
  const parts = path.split('/').filter(Boolean);
  setNav(path);
  window.scrollTo(0, 0);
  try {
    if (!parts.length) return await viewDeck();
    if (parts[0] === 'forge') return await viewForge();
    if (parts[0] === 'paket') return await viewPaket(parts[1]);
    if (parts[0] === 'latihan') return await viewLatihan(parts[1]);
    if (parts[0] === 'aar') return await viewAAR(parts[1]);
    if (parts[0] === 'tentang') return viewTentang();
    return await viewDeck();
  } catch (e) {
    app.innerHTML = `<div class="wrap"><div class="card card-pad" style="margin-top:40px"><div class="eyebrow">GALAT</div><h2>${esc(e.message)}</h2><p class="muted" style="margin-top:8px"><a href="#/" style="color:var(--green)">Kembali ke papan komando</a></p></div></div>`;
  }
}

if (MODE === 'local') {
  const st = document.querySelector('.status-dot');
  if (st) st.innerHTML = '<i></i> MODE OFFLINE · LOKAL';
}

window.addEventListener('hashchange', route);
route();