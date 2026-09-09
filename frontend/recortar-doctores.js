import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_BANNER = path.resolve('../raw-images/banner-medicos.jpeg');
const OUTPUT_HERO = path.resolve('public/images/marketing/doctors-hero.webp');

async function extractDoctors() {
  if (!fs.existsSync(RAW_BANNER)) {
    console.error(`Error: No se encuentra la imagen original en: ${RAW_BANNER}`);
    process.exit(1);
  }

  const image = sharp(RAW_BANNER);
  const metadata = await image.metadata();

  console.log(`Dimensiones originales: ${metadata.width}x${metadata.height} px`);

  // Extraemos desde el 38% del ancho hacia la derecha (donde se ubican los médicos)
  const left = Math.round(metadata.width * 0.38);
  const width = metadata.width - left;
  const top = 0;
  const height = metadata.height;

  await image
    .extract({ left, top, width, height })
    .resize({ width: 1280, withoutEnlargement: true }) // Resolución nítida para pantallas Retina
    .webp({ quality: 88, effort: 6 })
    .toFile(OUTPUT_HERO);

  const stats = fs.statSync(OUTPUT_HERO);
  console.log(`[OK] Generado exitosamente: doctors-hero.webp (${(stats.size / 1024).toFixed(1)} KB)`);
}

extractDoctors().catch((err) => {
  console.error('Error al procesar la imagen:', err);
  process.exit(1);
});