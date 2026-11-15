import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { daftarKombinasi, bangkitkanPaket, hitungAAR } from './src/generator.mjs';
import { buatDashboard } from './src/dashboard.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PUBLIC = join(ROOT, 'public');
const DATA = join(ROOT, 'data');
const STORE = join(DATA, 'store.json');
const PORT = Number(process.env.PORT || 4123);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2'
};

let store = { paket: [], sesi: [] };
async function muat() {
  try { store = JSON.parse(await readFile(STORE, 'utf8')); } catch { store = { paket: [], sesi: [] }; }
  if (!store.paket) store.paket = [];
  if (!store.sesi) store.sesi = [];
}
async function simpan() {
  await mkdir(DATA, { recursive: true });
  await writeFile(STORE, JSON.stringify(store, null, 1));
}

function json(res, code, data) {
  const body = JSON.stringify(data);
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(body);
}
async function body(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (path === '/api/health') return json(res, 200, { ok: true, waktu: new Date().toISOString() });
    if (path === '/api/meta') return json(res, 200, daftarKombinasi());

    if (path === '/api/generate' && req.method === 'POST') {
      const { satuanId, aktorId, level } = await body(req);
      const paket = bangkitkanPaket({ satuanId, aktorId, level });
      store.paket.push(paket);
      if (store.paket.length > 60) store.paket = store.paket.slice(-60);
      await simpan();
      return json(res, 200, paket);
    }

    if (path === '/api/packages') {
      return json(res, 200, store.paket.slice(-20).reverse().map((p) => ({
        id: p.id, nama: p.meta.nama, satuan: p.meta.satuan.nama, aktor: p.meta.aktor.nama,
        level: p.meta.levelNama, dibuat: p.dibuat, inject: p.injects.length
      })));
    }

    const mPkt = path.match(/^\/api\/package\/([A-Z0-9-]+)$/);
    if (mPkt) {
      const p = store.paket.find((x) => x.id === mPkt[1]);
      if (!p) return json(res, 404, { error: 'Paket tidak ditemukan' });
      return json(res, 200, p);
    }

    if (path === '/api/session' && req.method === 'POST') {
      const { packageId, tim } = await body(req);
      const p = store.paket.find((x) => x.id === packageId);
      if (!p) return json(res, 404, { error: 'Paket tidak ditemukan' });
      const sesi = {
        id: `SES-${Date.now().toString(36).toUpperCase()}`,
        paketId: p.id, paketSatuan: p.meta.satuan.id, satuanNama: p.meta.satuan.nama,
        aktorNama: p.meta.aktor.nama, level: p.meta.levelNama,
        tim: (tim || 'Tim Latihan').slice(0, 60),
        mulai: new Date().toISOString(),
        jawaban: {}, aar: null, selesai: false, indeks: 0
      };
      store.sesi.push(sesi);
      await simpan();
      return json(res, 200, { sesi, paket: p });
    }

    const mJawab = path.match(/^\/api\/session\/([A-Z0-9-]+)\/jawab$/);
    if (mJawab && req.method === 'POST') {
      const sesi = store.sesi.find((x) => x.id === mJawab[1]);
      if (!sesi) return json(res, 404, { error: 'Sesi tidak ditemukan' });
      const p = store.paket.find((x) => x.id === sesi.paketId);
      const { injectId, opsi } = await body(req);
      const inj = p.injects.find((x) => x.id === injectId);
      if (!inj) return json(res, 400, { error: 'Inject tidak dikenal' });
      const dipilih = (opsi || []).filter((o) => inj.opsi.some((x) => x.id === o));
      sesi.jawaban[injectId] = dipilih;
      sesi.indeks = Math.min(sesi.indeks + 1, p.injects.length);
      await simpan();
      const umpan = inj.opsi.filter((o) => dipilih.includes(o.id)).map((o) => ({ teks: o.teks, umpan: o.umpan, baik: o.baik }));
      const skor = { deteksi: 0, containment: 0, eradikasi: 0, forensik: 0, pelaporan: 0, komando: 0 };
      inj.opsi.filter((o) => dipilih.includes(o.id)).forEach((o) => Object.keys(skor).forEach((k) => { skor[k] += o.skor[k] || 0; }));
      return json(res, 200, { sesi, umpan, skor, terbaik: inj.opsi.filter((o) => o.baik).map((o) => o.teks) });
    }

    const mSelesai = path.match(/^\/api\/session\/([A-Z0-9-]+)\/selesai$/);
    if (mSelesai && req.method === 'POST') {
      const sesi = store.sesi.find((x) => x.id === mSelesai[1]);
      if (!sesi) return json(res, 404, { error: 'Sesi tidak ditemukan' });
      const p = store.paket.find((x) => x.id === sesi.paketId);
      sesi.aar = hitungAAR(p, sesi.jawaban);
      sesi.selesai = true;
      sesi.selesaiPada = new Date().toISOString();
      await simpan();
      return json(res, 200, { sesi, aar: sesi.aar, paket: p });
    }

    const mSesi = path.match(/^\/api\/session\/([A-Z0-9-]+)$/);
    if (mSesi) {
      const sesi = store.sesi.find((x) => x.id === mSesi[1]);
      if (!sesi) return json(res, 404, { error: 'Sesi tidak ditemukan' });
      const p = store.paket.find((x) => x.id === sesi.paketId);
      return json(res, 200, { sesi, paket: p });
    }

    if (path === '/api/dashboard') return json(res, 200, buatDashboard(store));

    if (path === '/api/reset' && req.method === 'POST') {
      store = { paket: [], sesi: [] };
      await simpan();
      return json(res, 200, { ok: true });
    }

    // statis
    let file = path === '/' ? '/index.html' : path;
    if (file.includes('..')) return json(res, 400, { error: 'bad path' });
    const full = join(PUBLIC, file);
    if (!existsSync(full)) return json(res, 404, { error: 'not found' });
    const buf = await readFile(full);
    res.writeHead(200, { 'content-type': MIME[extname(full)] || 'application/octet-stream', 'cache-control': 'no-cache' });
    res.end(buf);
  } catch (err) {
    console.error(err);
    json(res, 500, { error: String(err && err.message || err) });
  }
});

await muat();
server.listen(PORT, '0.0.0.0', () => {
  console.log(`LATMA SIBER aktif di http://localhost:${PORT}`);
});