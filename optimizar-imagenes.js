import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './src/img';
const outputDir = './src/img-opt';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const archivos = fs.readdirSync(inputDir).filter(f =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
);

for (const archivo of archivos) {
    const entrada = path.join(inputDir, archivo);
    const nombre = path.parse(archivo).name;
    const salida = path.join(outputDir, nombre + '.webp');

    const antes = fs.statSync(entrada).size;

    // Obtener metadatos de la imagen para calcular tamaños
    const metadata = await sharp(entrada).metadata();
    const anchoOriginal = metadata.width;
    const altoOriginal = metadata.height;

    await sharp(entrada).webp({ quality: 80 }).toFile(salida);
    const despues = fs.statSync(salida).size;

    // Versiones para Art Direction (diferentes tamaños según viewport)
    await sharp(entrada).resize(300).webp({ quality: 80 }).toFile(`${outputDir}/${nombre}-300.webp`);
    await sharp(entrada).resize(600).webp({ quality: 80 }).toFile(`${outputDir}/${nombre}-600.webp`);
    await sharp(entrada).resize(900).webp({ quality: 80 }).toFile(`${outputDir}/${nombre}-900.webp`);

    // Versiones para Resolution Switching (diferentes densidades de píxeles)
    await sharp(entrada).webp({ quality: 85 }).toFile(`${outputDir}/${nombre}-1x.webp`);
    await sharp(entrada).resize(anchoOriginal * 2, altoOriginal * 2).webp({ quality: 85 }).toFile(`${outputDir}/${nombre}-2x.webp`);
    await sharp(entrada).resize(anchoOriginal * 3, altoOriginal * 3).webp({ quality: 85 }).toFile(`${outputDir}/${nombre}-3x.webp`);

    // Versión cuadrada para móvil (dirección de arte)
    await sharp(`${outputDir}/${nombre}.webp`)
        .resize(400, 400, { fit: 'cover', position: 'top' })
        .webp({ quality: 80 })
        .toFile(`${outputDir}/${nombre}-cuadrado.webp`);

    // Versión tablet (apaisada)
    await sharp(`${outputDir}/${nombre}.webp`)
        .resize(800, 400, { fit: 'cover', position: 'top' })
        .webp({ quality: 80 })
        .toFile(`${outputDir}/${nombre}-tablet.webp`);

    const mejora = (((antes - despues) / antes) * 100).toFixed(1);
    console.log(`${archivo} (${anchoOriginal}x${altoOriginal}) → versiones optimizadas | Antes: ${(antes / 1024).toFixed(0)}KB | Después: ${(despues / 1024).toFixed(0)}KB | Mejora: ${mejora}%`);
}
