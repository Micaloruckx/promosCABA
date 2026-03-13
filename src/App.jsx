import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import PromoDetail from './pages/PromoDetail/PromoDetail'
import Favoritos from './pages/Favoritos/Favoritos'
import Acerca from './pages/Acerca/Acerca'
import { useAppContext } from './context/AppContext'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/promo/:promoId" element={<PromoDetail />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/acerca" element={<AdminRoute><Acerca /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  )

function AdminRoute({ children }) {
  const { admin, loginAdmin } = useAppContext()
  const [pass, setPass] = React.useState('')
  const [error, setError] = React.useState('')
  if (admin) return children
  return (
    <div style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center', background: '#fff', padding: 32, borderRadius: 16, boxShadow: '0 2px 12px #ccc' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-navy)' }}>Acceso administrador</h2>
      <input
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        placeholder="Contraseña"
        style={{ padding: 12, borderRadius: 8, border: '1.5px solid #ccc', width: '100%', marginBottom: 16 }}
      />
      <button
        style={{ padding: '10px 24px', borderRadius: 8, background: 'var(--color-blue)', color: '#fff', fontWeight: 600, border: 'none', width: '100%' }}
        onClick={() => {
          if (!loginAdmin(pass)) {
            setError('Contraseña incorrecta')
          } else {
            setError('')
          }
        }}
      >Ingresar</button>
      {error && <p style={{ color: 'var(--color-error)', marginTop: 12 }}>{error}</p>}
    </div>
  )
}
}

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-navy)' }}>404</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px' }}>Página no encontrada.</p>
      <a href="/" style={{ marginTop: '24px', display: 'inline-block', color: 'var(--color-blue)', fontWeight: 600 }}>
        Volver al inicio
      </a>
    </div>
  )
}
