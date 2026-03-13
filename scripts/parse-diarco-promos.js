// Script para parsear promos Diarco y actualizar promociones-pba.js
const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('diarco-promos.html', 'utf8');
const $ = cheerio.load(html);

// Ejemplo: buscar promos en la página
const promos = [];
$('.promo-card').each((i, el) => {
  const title = $(el).find('.promo-title').text().trim();
  const desc = $(el).find('.promo-desc').text().trim();
  const vigencia = $(el).find('.promo-vigencia').text().trim();
  // Completa con más campos según estructura real
  promos.push({
    title,
    desc,
    vigencia,
    // ...otros campos
  });
});

fs.writeFileSync('diarco-promos.json', JSON.stringify(promos, null, 2));
console.log('Promos Diarco parseadas y guardadas en diarco-promos.json');

// Para integración real: transformar promos a formato promociones-pba.js y actualizar el archivo.