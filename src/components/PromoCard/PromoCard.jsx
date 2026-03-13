import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { RiHeartLine, RiHeartFill, RiCalendarLine, RiTimeLine, RiMapPinLine } from 'react-icons/ri'
import { useAppContext } from '../../context/AppContext'
import { getMedioPago, DIAS_SEMANA } from '../../data/catalogo'
import { useGetSupermercado } from '../../hooks/usePromos'
import { CIUDADES } from '../../data/promociones-pba'
import styles from './PromoCard.module.css'

const TIPO_CONFIG = {
  descuento:  { label: 'Descuento',  className: 'tagDescuento' },
  cashback:   { label: 'Cashback',   className: 'tagCashback' },
  cuotas:     { label: 'Cuotas s/i', className: 'tagCuotas' },
  reintegro:  { label: 'Reintegro',  className: 'tagReintegro' },
}

export default function PromoCard({ promo }) {
  const { toggleFavorito, isFavorito, zona } = useAppContext()
  const getSupermercado = useGetSupermercado()
  const fav = isFavorito(promo.id)
  const super_ = getSupermercado(promo.supermercado)
  const medio = getMedioPago(promo.medioPago)
  const tipoConfig = TIPO_CONFIG[promo.tipo] ?? { label: promo.tipo, className: 'tagDescuento' }

  const diasLabel = promo.dias === null
    ? 'Todos los días'
    : promo.dias.map(d => DIAS_SEMANA[d]?.label).join(' · ')

  const ciudadesLabel = zona === 'pba' && promo.ciudades
    ? promo.ciudades
        .map(cid => CIUDADES.find(c => c.id === cid))
        .filter(Boolean)
        .map(c => `${c.emoji} ${c.label}`)
        .join(', ')
    : null

  return (
    <article className={`${styles.card} ${promo.destacada ? styles.destacada : ''}`}>
      {promo.destacada && (
        <div className={styles.destacadaBanner} aria-label="Promoción destacada">⭐ Destacada</div>
      )}

      <header className={styles.header}>
        <div className={styles.superInfo}>
          <span className={styles.superLogo} aria-hidden="true" style={{ background: super_.color + '18' }}>
            {super_.logo}
          </span>
          <span className={styles.superLabel}>{super_.label}</span>
        </div>
        <button
          className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
          onClick={() => toggleFavorito(promo.id)}
          aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={fav}
        >
          {fav ? <RiHeartFill aria-hidden="true" /> : <RiHeartLine aria-hidden="true" />}
        </button>
      </header>

      <div className={styles.body}>
        <div className={styles.discount}>
          <span className={styles.discountValue}>{buildDiscountLabel(promo)}</span>
        </div>
        <p className={styles.description}>{promo.descripcion}</p>
        <div className={styles.medioPago}>
          <span className={styles.medioLogo} aria-hidden="true">{medio.logo}</span>
          <span className={styles.medioLabel}>{medio.label}</span>
          <span className={`${styles.tipoTag} ${styles[tipoConfig.className]}`}>
            {tipoConfig.label}
          </span>
        </div>
        {promo.tope && (
          <p className={styles.tope}>Tope: ${promo.tope.toLocaleString('es-AR')}</p>
        )}
      </div>

      <footer className={styles.footer}>
        <span className={styles.meta}>
          <RiCalendarLine aria-hidden="true" />
          {diasLabel}
        </span>
        {ciudadesLabel && (
          <span className={styles.meta}>
            <RiMapPinLine aria-hidden="true" />
            {ciudadesLabel}
          </span>
        )}
        {promo.vencimiento && (
          <span className={styles.meta}>
            <RiTimeLine aria-hidden="true" />
            Hasta {formatDate(promo.vencimiento)}
          </span>
        )}
        <Link
          to={`/promo/${promo.id}`}
          className={styles.detailLink}
          aria-label={`Ver detalle: ${promo.descripcion}`}
        >
          Ver detalle →
        </Link>
      </footer>
    </article>
  )
}

function buildDiscountLabel(promo) {
  if (promo.tipo === 'cuotas') {
    const m = promo.descripcion.match(/(\d+)\s+cuotas/i)
    return m ? `${m[1]} CSI` : 'Cuotas'
  }
  if (promo.tipo === 'cashback') {
    return `${promo.descuento}% Cashback`
  }
  if (promo.tipo === 'reintegro') {
    return `${promo.descuento}% Reintegro`
  }
  return `${promo.descuento}% Descuento`
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

PromoCard.propTypes = {
  promo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    supermercado: PropTypes.string.isRequired,
    medioPago: PropTypes.string.isRequired,
    descuento: PropTypes.number.isRequired,
    tipo: PropTypes.string.isRequired,
    tope: PropTypes.number,
    dias: PropTypes.arrayOf(PropTypes.number),
    ciudades: PropTypes.arrayOf(PropTypes.string),
    descripcion: PropTypes.string.isRequired,
    condiciones: PropTypes.string,
    vencimiento: PropTypes.string,
    destacada: PropTypes.bool,
  }).isRequired,
}
