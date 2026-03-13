import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { RiHeartLine, RiHeartFill, RiCalendarLine, RiTimeLine } from 'react-icons/ri'
import { useAppContext } from '../../context/AppContext'
import { getSupermercado, getMedioPago, DIAS_SEMANA } from '../../data/promociones'
import styles from './PromoCard.module.css'

const TIPO_CONFIG = {
  descuento: { label: 'Descuento', className: 'tagDescuento' },
  cashback: { label: 'Cashback', className: 'tagCashback' },
  cuotas: { label: 'Cuotas s/i', className: 'tagCuotas' },
  reintegro: { label: 'Reintegro', className: 'tagReintegro' },
}

export default function PromoCard({ promo }) {
  const { toggleFavorito, isFavorito } = useAppContext()
  const fav = isFavorito(promo.id)
  const super_ = getSupermercado(promo.supermercado)
  const medio = getMedioPago(promo.medioPago)
  const tipoConfig = TIPO_CONFIG[promo.tipo] ?? { label: promo.tipo, className: 'tagDescuento' }

  const diasLabel = promo.dias === null
    ? 'Todos los días'
    : promo.dias.map(d => DIAS_SEMANA[d].label).join(' · ')

  const descuentoDisplay =
    promo.tipo === 'cuotas'
      ? promo.descripcion.split(' ').slice(0, 2).join(' ')
      : `${promo.descuento}% OFF`

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
          <span className={styles.discountValue}>{discuentoDisplay(promo)}</span>
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
        <span className={styles.dias}>
          <RiCalendarLine aria-hidden="true" />
          {diasLabel}
        </span>

        {promo.vencimiento && (
          <span className={styles.vencimiento}>
            <RiTimeLine aria-hidden="true" />
            Hasta {formatDate(promo.vencimiento)}
          </span>
        )}

        <Link
          to={`/promo/${promo.id}`}
          className={styles.detailLink}
          aria-label={`Ver detalle de ${promo.descripcion} en ${super_.label}`}
        >
          Ver detalle →
        </Link>
      </footer>
    </article>
  )
}

function discuentoDisplay(promo) {
  if (promo.tipo === 'cuotas') {
    const match = promo.descripcion.match(/(\d+)\s+cuotas/i)
    return match ? `${match[1]} CSI` : 'Cuotas'
  }
  return `${promo.descuento}%`
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
    descripcion: PropTypes.string.isRequired,
    condiciones: PropTypes.string,
    vencimiento: PropTypes.string,
    destacada: PropTypes.bool,
  }).isRequired,
}
