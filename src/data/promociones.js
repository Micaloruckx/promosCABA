// ================================================
// PROMOS CABA – Base de datos de promociones
// Actualizar esta lista cada vez que cambien
// las promo bancarias/billeteras virtuales.
// ================================================

export const DIAS_SEMANA = [
  { id: 0, label: 'Dom', fullLabel: 'Domingo' },
  { id: 1, label: 'Lun', fullLabel: 'Lunes' },
  { id: 2, label: 'Mar', fullLabel: 'Martes' },
  { id: 3, label: 'Mié', fullLabel: 'Miércoles' },
  { id: 4, label: 'Jue', fullLabel: 'Jueves' },
  { id: 5, label: 'Vie', fullLabel: 'Viernes' },
  { id: 6, label: 'Sáb', fullLabel: 'Sábado' },
]

export const SUPERMERCADOS = [
  { id: 'carrefour', label: 'Carrefour', logo: '🛒', color: '#003DA5' },
  { id: 'coto', label: 'Coto', logo: '🏪', color: '#E30613' },
  { id: 'dia', label: 'DIA', logo: '🔴', color: '#EE1D23' },
  { id: 'jumbo', label: 'Jumbo', logo: '🐘', color: '#00923A' },
  { id: 'disco', label: 'Disco', logo: '🌀', color: '#00539B' },
  { id: 'vea', label: 'Vea', logo: '🟢', color: '#5DB533' },
  { id: 'walmart', label: 'Walmart', logo: '⭐', color: '#0071CE' },
  { id: 'la-anonima', label: 'La Anónima', logo: '🏬', color: '#CC0000' },
]

export const MEDIOS_PAGO = [
  { id: 'mercadopago', label: 'Mercado Pago', logo: '💙', tipo: 'billetera' },
  { id: 'modo', label: 'MODO', logo: '📱', tipo: 'billetera' },
  { id: 'personal-pay', label: 'Personal Pay', logo: '🟣', tipo: 'billetera' },
  { id: 'cuenta-dni', label: 'Cuenta DNI', logo: '🏦', tipo: 'billetera' },
  { id: 'naranja-x', label: 'Naranja X', logo: '🟠', tipo: 'billetera' },
  { id: 'galicia', label: 'Tarjeta Galicia', logo: '🔴', tipo: 'banco' },
  { id: 'banco-nacion', label: 'Banco Nación', logo: '🇦🇷', tipo: 'banco' },
  { id: 'santander', label: 'Santander', logo: '🔴', tipo: 'banco' },
  { id: 'bbva', label: 'BBVA', logo: '🔵', tipo: 'banco' },
  { id: 'hsbc', label: 'HSBC', logo: '⬛', tipo: 'banco' },
  { id: 'macro', label: 'Banco Macro', logo: '🟡', tipo: 'banco' },
  { id: 'icbc', label: 'ICBC', logo: '🟥', tipo: 'banco' },
  { id: 'ciudad', label: 'Banco Ciudad', logo: '🏙️', tipo: 'banco' },
  { id: 'provincia', label: 'Bco. Provincia', logo: '🟦', tipo: 'banco' },
  { id: 'patagonia', label: 'Bco. Patagonia', logo: '🌄', tipo: 'banco' },
  { id: 'supervielle', label: 'Supervielle', logo: '🟩', tipo: 'banco' },
  { id: 'visa', label: 'Visa', logo: '💳', tipo: 'red' },
  { id: 'mastercard', label: 'Mastercard', logo: '🔴', tipo: 'red' },
  { id: 'amex', label: 'American Express', logo: '🔵', tipo: 'red' },
]

// ------------------------------------------------
// PROMOCIONES VIGENTES
// Campos:
//   id: string único
//   supermercado: id del supermercado
//   medioPago: id del medio de pago
//   descuento: número (porcentaje)
//   tipo: 'descuento' | 'cuotas' | 'cashback' | 'reintegro'
//   tope: número (tope de descuento en $ARS, null = sin tope)
//   dias: array de días de la semana (0=Dom ... 6=Sáb), null = todos los días
//   descripcion: texto libre
//   condiciones: texto con condiciones
//   vencimiento: string fecha ISO o null
//   destacada: boolean
// ------------------------------------------------
export const PROMOCIONES = [
  // ---- CARREFOUR ----
  {
    id: 'car-mp-lun',
    supermercado: 'carrefour',
    medioPago: 'mercadopago',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [1],
    descripcion: '20% OFF pagando con Mercado Pago',
    condiciones: 'Tope $2.000 de descuento. Una transacción por usuario.',
    vencimiento: '2025-03-31',
    destacada: true,
  },
  {
    id: 'car-mp-jue',
    supermercado: 'carrefour',
    medioPago: 'mercadopago',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [4],
    descripcion: '20% OFF pagando con Mercado Pago',
    condiciones: 'Tope $2.000 de descuento. Una transacción por usuario.',
    vencimiento: '2025-03-31',
    destacada: true,
  },
  {
    id: 'car-modo-mar',
    supermercado: 'carrefour',
    medioPago: 'modo',
    descuento: 15,
    tipo: 'descuento',
    tope: 1500,
    dias: [2],
    descripcion: '15% OFF con MODO',
    condiciones: 'Tope $1.500 de descuento. Débito o crédito vinculado a MODO.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'car-galicia-vie',
    supermercado: 'carrefour',
    medioPago: 'galicia',
    descuento: 30,
    tipo: 'descuento',
    tope: 3000,
    dias: [5],
    descripcion: '3x2 o 30% OFF con Tarjeta Galicia',
    condiciones: 'Válido viernes. Crédito y débito Galicia. Tope $3.000.',
    vencimiento: '2025-04-30',
    destacada: true,
  },
  {
    id: 'car-nacion-mie',
    supermercado: 'carrefour',
    medioPago: 'banco-nacion',
    descuento: 25,
    tipo: 'descuento',
    tope: 2500,
    dias: [3],
    descripcion: '25% OFF con tarjeta Banco Nación',
    condiciones: 'Débito y crédito BNA. Tope $2.500.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'car-visa-sab',
    supermercado: 'carrefour',
    medioPago: 'visa',
    descuento: 0,
    tipo: 'cuotas',
    tope: null,
    dias: [6],
    descripcion: '3 cuotas sin interés con Visa',
    condiciones: 'Compras mayores a $10.000. Tarjetas de crédito Visa.',
    vencimiento: null,
    destacada: false,
  },

  // ---- COTO ----
  {
    id: 'coto-mp-vie',
    supermercado: 'coto',
    medioPago: 'mercadopago',
    descuento: 20,
    tipo: 'descuento',
    tope: 1500,
    dias: [5],
    descripcion: '20% OFF con Mercado Pago',
    condiciones: 'Tope $1.500 de descuento. Solo compras presenciales con QR.',
    vencimiento: '2025-03-31',
    destacada: true,
  },
  {
    id: 'coto-modo-jue',
    supermercado: 'coto',
    medioPago: 'modo',
    descuento: 15,
    tipo: 'descuento',
    tope: 1500,
    dias: [4],
    descripcion: '15% OFF con MODO',
    condiciones: 'Tope $1.500. Pago con QR MODO en caja.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'coto-cuenta-dni-sab',
    supermercado: 'coto',
    medioPago: 'cuenta-dni',
    descuento: 20,
    tipo: 'cashback',
    tope: 2000,
    dias: [6],
    descripcion: '20% de cashback con Cuenta DNI',
    condiciones: 'Reintegro en cuenta dentro de las 72 hs. Tope $2.000.',
    vencimiento: '2025-04-30',
    destacada: true,
  },
  {
    id: 'coto-provincia-lun',
    supermercado: 'coto',
    medioPago: 'provincia',
    descuento: 25,
    tipo: 'descuento',
    tope: 2500,
    dias: [1],
    descripcion: '25% OFF con Banco Provincia',
    condiciones: 'Tarjeta débito y crédito Provincia. Tope $2.500.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'coto-ciudad-mar',
    supermercado: 'coto',
    medioPago: 'ciudad',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [2],
    descripcion: '20% OFF con Banco Ciudad',
    condiciones: 'Crédito y débito Ciudad. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },

  // ---- DIA ----
  {
    id: 'dia-mp-mie',
    supermercado: 'dia',
    medioPago: 'mercadopago',
    descuento: 20,
    tipo: 'descuento',
    tope: 1000,
    dias: [3],
    descripcion: '20% OFF con Mercado Pago',
    condiciones: 'Tope $1.000. Compras presenciales con QR.',
    vencimiento: null,
    destacada: true,
  },
  {
    id: 'dia-personal-pay-jue',
    supermercado: 'dia',
    medioPago: 'personal-pay',
    descuento: 30,
    tipo: 'cashback',
    tope: 1500,
    dias: [4],
    descripcion: '30% cashback con Personal Pay',
    condiciones: 'Reintegro acreditado al día siguiente. Tope $1.500.',
    vencimiento: '2025-04-15',
    destacada: true,
  },
  {
    id: 'dia-macro-vie',
    supermercado: 'dia',
    medioPago: 'macro',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [5],
    descripcion: '20% OFF con Banco Macro',
    condiciones: 'Crédito y débito Macro. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },

  // ---- JUMBO ----
  {
    id: 'jumbo-santander-mar',
    supermercado: 'jumbo',
    medioPago: 'santander',
    descuento: 30,
    tipo: 'descuento',
    tope: 3000,
    dias: [2],
    descripcion: '30% OFF con Santander',
    condiciones: 'Crédito y débito Santander. Tope $3.000.',
    vencimiento: '2025-04-30',
    destacada: true,
  },
  {
    id: 'jumbo-bbva-jue',
    supermercado: 'jumbo',
    medioPago: 'bbva',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [4],
    descripcion: '20% OFF con BBVA',
    condiciones: 'Crédito y débito BBVA. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'jumbo-modo-lun',
    supermercado: 'jumbo',
    medioPago: 'modo',
    descuento: 15,
    tipo: 'descuento',
    tope: 1500,
    dias: [1],
    descripcion: '15% OFF con MODO',
    condiciones: 'Compras presenciales con QR MODO.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'jumbo-naranja-x-sab',
    supermercado: 'jumbo',
    medioPago: 'naranja-x',
    descuento: 25,
    tipo: 'cashback',
    tope: 2000,
    dias: [6],
    descripcion: '25% cashback con Naranja X',
    condiciones: 'Reintegro en 48 hs. Tope $2.000.',
    vencimiento: '2025-04-30',
    destacada: true,
  },

  // ---- DISCO ----
  {
    id: 'disco-hsbc-mie',
    supermercado: 'disco',
    medioPago: 'hsbc',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [3],
    descripcion: '20% OFF con HSBC',
    condiciones: 'Crédito y débito HSBC. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'disco-icbc-vie',
    supermercado: 'disco',
    medioPago: 'icbc',
    descuento: 25,
    tipo: 'descuento',
    tope: 2500,
    dias: [5],
    descripcion: '25% OFF con ICBC',
    condiciones: 'Crédito y débito ICBC. Tope $2.500.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'disco-mp-dom',
    supermercado: 'disco',
    medioPago: 'mercadopago',
    descuento: 15,
    tipo: 'descuento',
    tope: 1500,
    dias: [0],
    descripcion: '15% OFF con Mercado Pago',
    condiciones: 'QR presencial. Tope $1.500.',
    vencimiento: null,
    destacada: false,
  },

  // ---- VEA ----
  {
    id: 'vea-supervielle-lun',
    supermercado: 'vea',
    medioPago: 'supervielle',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [1],
    descripcion: '20% OFF con Supervielle',
    condiciones: 'Crédito y débito Supervielle. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'vea-patagonia-jue',
    supermercado: 'vea',
    medioPago: 'patagonia',
    descuento: 20,
    tipo: 'descuento',
    tope: 2000,
    dias: [4],
    descripcion: '20% OFF con Banco Patagonia',
    condiciones: 'Crédito y débito Patagonia. Tope $2.000.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'vea-modo-mie',
    supermercado: 'vea',
    medioPago: 'modo',
    descuento: 10,
    tipo: 'descuento',
    tope: 1000,
    dias: [3],
    descripcion: '10% OFF con MODO',
    condiciones: 'Compras presenciales con QR MODO.',
    vencimiento: null,
    destacada: false,
  },

  // ---- WALMART ----
  {
    id: 'walmart-mastercard-vie',
    supermercado: 'walmart',
    medioPago: 'mastercard',
    descuento: 0,
    tipo: 'cuotas',
    tope: null,
    dias: [5],
    descripcion: '6 cuotas sin interés con Mastercard',
    condiciones: 'Compras mayores a $20.000. Crédito Mastercard.',
    vencimiento: null,
    destacada: false,
  },
  {
    id: 'walmart-amex-todo',
    supermercado: 'walmart',
    medioPago: 'amex',
    descuento: 15,
    tipo: 'reintegro',
    tope: 2000,
    dias: null,
    descripcion: '15% de reintegro con American Express',
    condiciones: 'Todos los días. Tope $2.000. Crédito Amex.',
    vencimiento: '2025-05-31',
    destacada: true,
  },
]

// Helper: obtener promos para un día de semana dado
export function getPromosPorDia(diaId) {
  return PROMOCIONES.filter(p => p.dias === null || p.dias.includes(diaId))
}

// Helper: obtener nombre del supermercado
export function getSupermercado(id) {
  return SUPERMERCADOS.find(s => s.id === id) ?? { id, label: id, logo: '🏬', color: '#888' }
}

// Helper: obtener datos del medio de pago
export function getMedioPago(id) {
  return MEDIOS_PAGO.find(m => m.id === id) ?? { id, label: id, logo: '💳', tipo: 'otro' }
}
