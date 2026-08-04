/**
 * public/images 아래의 큰 이미지 자산을 폭 1600px / WebP q82로 줄인다.
 * 사용법: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const TARGETS = [
  'public/images/official/app',
  'public/images/official/openai',
  'public/images/generated',
];
const MAX_WIDTH = 1600;
const SIZE_THRESHOLD = 300_000;

for (const dir of TARGETS) {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const before = await stat(filePath);
    if (before.size < SIZE_THRESHOLD) continue;

    const meta = await sharp(filePath).metadata();
    const outPath = filePath.replace(/\.(png|jpe?g|webp)$/i, '.webp');
    const tmpPath = `${filePath}.tmp.webp`;

    await sharp(filePath)
      .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(tmpPath);

    if (outPath !== filePath) await unlink(filePath);
    await rename(tmpPath, outPath);

    const after = await stat(outPath);
    console.log(
      `${file}: ${Math.round(before.size / 1024)}KB -> ${Math.round(after.size / 1024)}KB (${meta.width}x${meta.height})`
    );
  }
}
