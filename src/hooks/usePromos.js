import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { getPromosPorDia } from '../data/catalogo'

import {
  PROMOCIONES as PROMOS_CABA,
  SUPERMERCADOS as SUPERS_CABA,
} from '../data/promociones-caba.js'

import {
  PROMOCIONES as PROMOS_PBA,
  SUPERMERCADOS as SUPERS_PBA,
} from '../data/promociones-pba.js'

export function getSupermercadoDeZona(zona, id) {
  const lista = zona === 'pba' ? SUPERS_PBA : SUPERS_CABA
  return lista.find(s => s.id === id) ?? { id, label: id, logo: '🏬', color: '#888' }
}

export function usePromosFiltradas() {
  const {
    zona, ciudadSeleccionada, diaSeleccionado,
    filtroSuper, filtroMedio, filtroTipo, searchQuery,
  } = useAppContext()

  const todasLasPromos = zona === 'pba' ? PROMOS_PBA : PROMOS_CABA

  const promosFiltradas = useMemo(() => {
    let result = getPromosPorDia(todasLasPromos, diaSeleccionado)

    // Filtrar por vigencia: solo promos del mes en curso
    const now = new Date()
    const currentMonth = now.getMonth() + 1 // getMonth() es 0-indexed
    const currentYear = now.getFullYear()
    result = result.filter(p => {
      if (!p.vencimiento) return true
      const [year, month] = p.vencimiento.split('-').map(Number)
      return year === currentYear && month === currentMonth
    })

    if (zona === 'pba' && ciudadSeleccionada && ciudadSeleccionada !== 'todas') {
      result = result.filter(p => p.ciudades === null || p.ciudades.includes(ciudadSeleccionada))
    }
    if (filtroSuper.length > 0) result = result.filter(p => filtroSuper.includes(p.supermercado))
    if (filtroMedio.length > 0) result = result.filter(p => filtroMedio.includes(p.medioPago))
    if (filtroTipo.length > 0) result = result.filter(p => filtroTipo.includes(p.tipo))
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.descripcion.toLowerCase().includes(q) ||
        p.supermercado.toLowerCase().includes(q) ||
        p.medioPago.toLowerCase().includes(q)
      )
    }
    return [...result].sort((a, b) => (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0))
  }, [zona, ciudadSeleccionada, diaSeleccionado, filtroSuper, filtroMedio, filtroTipo, searchQuery, todasLasPromos])

  return { promos: promosFiltradas, total: todasLasPromos.length, visible: promosFiltradas.length }
}

export function useSupermercadosZona() {
  const { zona } = useAppContext()
  return zona === 'pba' ? SUPERS_PBA : SUPERS_CABA
}

export function useGetSupermercado() {
  const { zona } = useAppContext()
  return (id) => getSupermercadoDeZona(zona, id)
}

export function usePromosFavoritas() {
  const { favoritos } = useAppContext()
  const todas = useMemo(() => [...PROMOS_CABA, ...PROMOS_PBA], [])
  return useMemo(() => todas.filter(p => favoritos.includes(p.id)), [favoritos, todas])
}

export function usePromoById(id) {
  return useMemo(
    () => [...PROMOS_CABA, ...PROMOS_PBA].find(p => p.id === id) ?? null,
    [id]
  )
}
