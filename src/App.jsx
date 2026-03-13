import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import PromoDetail from './pages/PromoDetail/PromoDetail'
import Favoritos from './pages/Favoritos/Favoritos'
import Acerca from './pages/Acerca/Acerca'

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
            <Route path="/acerca" element={<Acerca />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  )
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
