// ================================================
// PROMOS APP – Catálogo compartido entre zonas
// DIAS_SEMANA y MEDIOS_PAGO son iguales en todas
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

export const MEDIOS_PAGO = [
  { id: 'mercadopago',  label: 'Mercado Pago',      logo: '💙', tipo: 'billetera' },
  { id: 'modo',         label: 'MODO',               logo: '📱', tipo: 'billetera' },
  { id: 'personal-pay', label: 'Personal Pay',       logo: '🟣', tipo: 'billetera' },
  { id: 'cuenta-dni',   label: 'Cuenta DNI',         logo: '🏦', tipo: 'billetera' },
  { id: 'naranja-x',    label: 'Naranja X',          logo: '🟠', tipo: 'billetera' },
  { id: 'galicia',      label: 'Tarjeta Galicia',    logo: '🔴', tipo: 'banco' },
  { id: 'banco-nacion', label: 'Banco Nación',       logo: '🇦🇷', tipo: 'banco' },
  { id: 'santander',    label: 'Santander',          logo: '🔴', tipo: 'banco' },
  { id: 'bbva',         label: 'BBVA',               logo: '🔵', tipo: 'banco' },
  { id: 'hsbc',         label: 'HSBC',               logo: '⬛', tipo: 'banco' },
  { id: 'macro',        label: 'Banco Macro',        logo: '🟡', tipo: 'banco' },
  { id: 'icbc',         label: 'ICBC',               logo: '🟥', tipo: 'banco' },
  { id: 'ciudad',       label: 'Banco Ciudad',       logo: '🏙️', tipo: 'banco' },
  { id: 'provincia',    label: 'Bco. Provincia',     logo: '🟦', tipo: 'banco' },
  { id: 'patagonia',    label: 'Bco. Patagonia',     logo: '🌄', tipo: 'banco' },
  { id: 'supervielle',  label: 'Supervielle',        logo: '🟩', tipo: 'banco' },
  { id: 'credicoop',    label: 'Credicoop',          logo: '🤝', tipo: 'banco' },
  { id: 'visa',         label: 'Visa',               logo: '💳', tipo: 'red' },
  { id: 'mastercard',   label: 'Mastercard',         logo: '🔴', tipo: 'red' },
  { id: 'amex',         label: 'American Express',   logo: '🔵', tipo: 'red' },
]

// ---- Zonas disponibles ----
export const ZONAS = [
  {
    id: 'caba',
    label: 'CABA',
    fullLabel: 'Ciudad Autónoma de Buenos Aires',
    emoji: '🏙️',
  },
  {
    id: 'pba',
    label: 'Provincia',
    fullLabel: 'Provincia de Buenos Aires',
    emoji: '🌾',
  },
]

// ---- Helpers compartidos ----
export function getMedioPago(id) {
  return MEDIOS_PAGO.find(m => m.id === id) ?? { id, label: id, logo: '💳', tipo: 'otro' }
}

export function getPromosPorDia(promociones, diaId) {
  return promociones.filter(p => p.dias === null || p.dias.includes(diaId))
}
