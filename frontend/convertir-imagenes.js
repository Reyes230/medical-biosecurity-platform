import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_DIR = path.resolve('../raw-images');
const BRANDING_DIR = path.resolve('public/images/branding');
const MARKETING_DIR = path.resolve('public/images/marketing');

const jobs = [
  {
    input: path.join(RAW_DIR, 'logo-horizontal.jpeg'),
    output: path.join(BRANDING_DIR, 'logo-horizontal.webp'),
    width: 800,
    quality: 85,
  },
  {
    input: path.join(RAW_DIR, 'logo-icono.jpeg'),
    output: path.join(BRANDING_DIR, 'logo-icon.webp'),
    width: 512,
    height: 512,
    quality: 90,
  },
  {
    input: path.join(RAW_DIR, 'logo-vertical.jpeg'),
    output: path.join(BRANDING_DIR, 'logo-vertical.webp'),
    width: 600,
    quality: 85,
  },
  {
    input: path.join(RAW_DIR, 'banner-medicos.jpeg'),
    output: path.join(MARKETING_DIR, 'hero-banner-doctors.webp'),
    width: 1920,
    quality: 85,
  },
];

async function processImages() {
  console.log('Iniciando procesamiento y optimización a WebP...\n');

  for (const job of jobs) {
    if (!fs.existsSync(job.input)) {
      console.warn(`[OMITIDO] No existe el archivo de entrada: ${job.input}`);
      continue;
    }

    let pipeline = sharp(job.input);

    if (job.width && job.height) {
      pipeline = pipeline.resize(job.width, job.height, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } });
    } else if (job.width) {
      pipeline = pipeline.resize({ width: job.width, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: job.quality, effort: 6 })
      .toFile(job.output);

    const stats = fs.statSync(job.output);
    console.log(`[OK] Generado: ${path.basename(job.output)} (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\nProcesamiento finalizado con éxito.');
}

processImages().catch((err) => {
  console.error('Error procesando imágenes:', err);
  process.exit(1);
});