import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const today = new Date().getDay() // 0 = Sunday ... 6 = Saturday
  const [diaSeleccionado, setDiaSeleccionado] = useState(today)
  const [filtroSuper, setFiltroSuper] = useState([])         // [] = todos
  const [filtroMedio, setFiltroMedio] = useState([])          // [] = todos
  const [filtroTipo, setFiltroTipo] = useState([])            // [] = todos
  const [searchQuery, setSearchQuery] = useState('')
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('promos-favoritos') || '[]')
    } catch {
      return []
    }
  })

  const toggleFavorito = useCallback((promoId) => {
    setFavoritos(prev => {
      const next = prev.includes(promoId)
        ? prev.filter(id => id !== promoId)
        : [...prev, promoId]
      localStorage.setItem('promos-favoritos', JSON.stringify(next))
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

  // --- Login admin ---
  const [admin, setAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState(() => {
    // Permite configurar la contraseña desde localStorage o variable
    return localStorage.getItem('promos-admin-pass') || 'admin123'
  })
  const loginAdmin = useCallback((pass) => {
    if (pass === adminPassword) {
      setAdmin(true)
      return true
    }
    setAdmin(false)
    return false
  }, [adminPassword])
  const logoutAdmin = useCallback(() => setAdmin(false), [])
  const setAdminPasswordConfig = useCallback((pass) => {
    setAdminPassword(pass)
    localStorage.setItem('promos-admin-pass', pass)
  }, [])

  const value = {
    diaSeleccionado,
    setDiaSeleccionado,
    filtroSuper,
    setFiltroSuper,
    filtroMedio,
    setFiltroMedio,
    filtroTipo,
    setFiltroTipo,
    searchQuery,
    setSearchQuery,
    favoritos,
    toggleFavorito,
    isFavorito,
    resetFiltros,
    // Admin
    admin,
    loginAdmin,
    logoutAdmin,
    adminPassword,
    setAdminPasswordConfig,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
