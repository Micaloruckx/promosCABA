import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext(null)

import { useEffect } from 'react'
function getZonaInicial() {
  try { return localStorage.getItem('promos-zona') || 'caba' } catch { return 'caba' }
}
function getCiudadInicial() {
  try { return localStorage.getItem('promos-ciudad') || 'todas' } catch { return 'todas' }
}

export function AppProvider({ children }) {
  const today = new Date().getDay()

  const [zona, setZonaState] = useState(getZonaInicial)
  const [ciudadSeleccionada, setCiudadState] = useState(getCiudadInicial)

  // filtroSuper etc. need to be declared before setZona uses them
  const [filtroSuper, setFiltroSuper] = useState([])
  const [filtroMedio, setFiltroMedio] = useState([])
  const [filtroTipo, setFiltroTipo] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [diaSeleccionado, setDiaSeleccionado] = useState(today)

  const setZona = useCallback((nuevaZona) => {
    setZonaState(nuevaZona)
    setCiudadState('todas')
    setFiltroSuper([])
    setFiltroMedio([])
    setFiltroTipo([])
    setSearchQuery('')
    try {
      localStorage.setItem('promos-zona', nuevaZona)
      localStorage.setItem('promos-ciudad', 'todas')
    } catch { /* noop */ }
  }, [])

  const setCiudadSeleccionada = useCallback((ciudad) => {
    setCiudadState(ciudad)
    try { localStorage.setItem('promos-ciudad', ciudad) } catch { /* noop */ }
  }, [])

  // Mejor manejo de favoritos: robustez, sincronización, limpieza
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('promos-favoritos') || '[]')
      // Filtrar ids inválidos (promo eliminada)
      const allPromos = [
        ...(window.PROMOS_CABA || []),
        ...(window.PROMOS_PBA || [])
      ]
      if (allPromos.length) {
        return stored.filter(id => allPromos.some(p => p.id === id))
      }
      return stored
    } catch { return [] }
  })

  // Sincronizar con localStorage externo (por ejemplo, otro tab)
  useEffect(() => {
    const handler = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('promos-favoritos') || '[]')
        setFavoritos(stored)
      } catch {}
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const toggleFavorito = useCallback((promoId) => {
    setFavoritos(prev => {
      const next = prev.includes(promoId)
        ? prev.filter(id => id !== promoId)
        : [...prev, promoId]
      try {
        localStorage.setItem('promos-favoritos', JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  const isFavorito = useCallback((promoId) => favoritos.includes(promoId), [favoritos])

  const resetFiltros = useCallback(() => {
    setFiltroSuper([])
    setFiltroMedio([])
    setFiltroTipo([])
    setSearchQuery('')
  }, [])

  const value = {
    zona, setZona,
    ciudadSeleccionada, setCiudadSeleccionada,
    diaSeleccionado, setDiaSeleccionado,
    filtroSuper, setFiltroSuper,
    filtroMedio, setFiltroMedio,
    filtroTipo, setFiltroTipo,
    searchQuery, setSearchQuery,
    resetFiltros,
    favoritos, toggleFavorito, isFavorito,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppProvider.propTypes = { children: PropTypes.node.isRequired }

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
