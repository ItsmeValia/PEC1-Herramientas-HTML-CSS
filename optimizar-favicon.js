import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = './src/img/mama-icon.png';
const outputDir = './src/img-opt';

const tamaños = [16, 32, 48, 180, 192];

for (const size of tamaños) {
    await sharp(input)
    .resize(size, size)
    .png()
    .toFile(`./src/img-opt/mama-icon-${size}.png`);

    console.log(`Generado: mama-icon-${size}.png`);
}

await sharp(input)
.resize(32, 32)
.webp({ quality: 80 })
.toFile('./src/img-opt/mama-icon-32.webp');

console.log('Versión optimizada → mama-icon-32.webp');
