import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { PROMOCIONES, getPromosPorDia } from '../data/promociones'

/**
 * Devuelve las promociones filtradas según el contexto global
 * (día seleccionado, supermercados, medios de pago, tipo, búsqueda)
 */
export function usePromosFiltradas() {
  const {
    diaSeleccionado,
    filtroSuper,
    filtroMedio,
    filtroTipo,
    searchQuery,
  } = useAppContext()

  const promosFiltradas = useMemo(() => {
    let result = getPromosPorDia(diaSeleccionado)

    if (filtroSuper.length > 0) {
      result = result.filter(p => filtroSuper.includes(p.supermercado))
    }
    if (filtroMedio.length > 0) {
      result = result.filter(p => filtroMedio.includes(p.medioPago))
    }
    if (filtroTipo.length > 0) {
      result = result.filter(p => filtroTipo.includes(p.tipo))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.descripcion.toLowerCase().includes(q) ||
          p.supermercado.toLowerCase().includes(q) ||
          p.medioPago.toLowerCase().includes(q)
      )
    }

    // Destacadas primero
    return [...result].sort((a, b) => (b.destacada ? 1 : 0) - (a.destacada ? 1 : 0))
  }, [diaSeleccionado, filtroSuper, filtroMedio, filtroTipo, searchQuery])

  const total = PROMOCIONES.length
  const visible = promosFiltradas.length

  return { promos: promosFiltradas, total, visible }
}

/**
 * Devuelve solo las promos favoritas
 */
export function usePromosFavoritas() {
  const { favoritos } = useAppContext()
  return useMemo(
    () => PROMOCIONES.filter(p => favoritos.includes(p.id)),
    [favoritos]
  )
}
