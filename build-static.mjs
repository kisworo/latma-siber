import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'docs');

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, 'vendor'), { recursive: true });

await cp(join(ROOT, 'public'), DIST, { recursive: true });
for (const f of ['data.mjs', 'generator.mjs', 'dashboard.mjs']) {
  await cp(join(ROOT, 'src', f), join(DIST, 'vendor', f));
}

const html = await readFile(join(DIST, 'index.html'), 'utf8');
const hasil = html.replace(
  '<script type="module" src="./app.js"></script>',
  `<script>window.LATMA_MODE = 'local';</script>\n<script type="module" src="./app.js"></script>`
);
await writeFile(join(DIST, 'index.html'), hasil);

console.log('Build statis selesai →', DIST);
console.log('Seluruh mesin berjalan di peramban. Tidak perlu server, tidak perlu internet.');
