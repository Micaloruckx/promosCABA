// Script para actualizar promociones-pba.js automáticamente desde diarco-promos.json
const fs = require('fs');

const promosJson = JSON.parse(fs.readFileSync('diarco-promos.json', 'utf8'));

function promoToJS(promo) {
  // Adaptar según estructura real del JSON
  return `{
    id: 'diarco-${promo.title.replace(/\s+/g, '-').toLowerCase()}',
    supermercado: 'diarco',
    medioPago: 'desconocido',
    descuento: 0,
    tipo: 'descuento',
    tope: 0,
    dias: null,
    ciudades: ['tandil'],
    descripcion: '${promo.title} - ${promo.desc}',
    condiciones: '',
    vencimiento: '${promo.vigencia}',
    destacada: false,
  }`;
}

const promosJS = promosJson.map(promoToJS).join(',\n');

const fileHeader = `// ================================================\n// PROMOS PBA – Base de datos de promociones\n// ================================================\n\nexport const PROMOCIONES = [\n`;
const fileFooter = '\n];\n';

fs.writeFileSync('src/data/promociones-pba.js', fileHeader + promosJS + fileFooter);
console.log('promociones-pba.js actualizado automáticamente desde diarco-promos.json');