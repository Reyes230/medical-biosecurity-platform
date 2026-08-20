import fs from 'fs';

const inputDir = './public/images/scrubs/llanos';
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.webp'));

const variants = files.map((file) => {
  // Transforma "azul-marino.webp" -> "azul-marino"
  const rawName = file.replace('.webp', '');
  
  // Transforma "azul-marino" -> "Azul Marino" (Para mostrar en la UI)
  const colorName = rawName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Transforma "azul-marino" -> "AZUL-MARINO" (Para el SKU)
  const skuColor = rawName.toUpperCase();

  return {
    basePrice: 35.00,
    sku: `SCRUB-${skuColor}-S`, // Asumimos talla S por defecto para poblar
    currency: "USD",
    attributes: {
      Talla: "S",
      Tela: "Antifluido Premium",
      Color: colorName,
      Genero: "Unisex"
    }
  };
});

// Guardar el resultado en un archivo de texto
fs.writeFileSync('nuevas-variantes.json', JSON.stringify(variants, null, 2));
console.log(`✅ JSON generado con éxito para ${variants.length} variantes. Revisa el archivo 'nuevas-variantes.json'`);