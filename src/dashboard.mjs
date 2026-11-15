import { SATUAN, KOMPETENSI } from './data.mjs';

// Data contoh kesiapan satuan — dipakai untuk mengisi papan komando sebelum ada sesi nyata.
export const SEED = {
  poslog: [58, 61], yonif: [71, 68], denhub: [84, 79], gudmun: [49, 52],
  mabes: [77, 74], rumkit: [66, 70], koramil: [41, 44], denma: [62, 59]
};

export function buatDashboard(store) {
  const paket = store.paket || [];
  const semuaSesi = store.sesi || [];

  const unit = SATUAN.map((s) => {
    const sesi = semuaSesi.filter((x) => x.paketSatuan === s.id && x.aar);
    const nilai = sesi.length ? sesi.reduce((a, b) => a + b.aar.readiness, 0) / sesi.length : null;
    const seed = SEED[s.id] || [60];
    const dasar = seed.reduce((a, b) => a + b, 0) / seed.length;
    const readiness = nilai === null ? Math.round(dasar) : Math.round(dasar * 0.35 + nilai * 0.65);
    const tren = seed[seed.length - 1] - seed[0] || 0;
    return {
      id: s.id, nama: s.nama, jenis: s.jenis, personel: s.personel, lokasi: s.lokasi,
      readiness, tren, sesiNyata: sesi.length,
      status: readiness >= 80 ? 'SIAP' : readiness >= 65 ? 'CUKUP' : readiness >= 50 ? 'PERLU LATIHAN' : 'PRIORITAS'
    };
  });

  const rata = Math.round(unit.reduce((a, b) => a + b.readiness, 0) / unit.length);
  const selesai = semuaSesi.filter((x) => x.aar);

  const kompetensi = KOMPETENSI.map((k) => {
    const arr = selesai.map((s) => s.aar.skorKompetensi.find((x) => x.id === k.id)?.nilai).filter((v) => typeof v === 'number');
    const nilai = arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : Math.round(52 + k.bobot);
    return { id: k.id, nama: k.nama, nilai: Math.min(100, nilai) };
  });

  return {
    rata, unit, kompetensi,
    totalLatihan: paket.length,
    totalSesi: semuaSesi.length,
    sesiSelesai: selesai.length,
    sesiTerakhir: semuaSesi.slice(-5).reverse().map((s) => ({
      id: s.id, tim: s.tim, satuan: s.satuanNama, aktor: s.aktorNama, level: s.level,
      readiness: s.aar ? s.aar.readiness : null, waktu: s.mulai
    }))
  };
}
