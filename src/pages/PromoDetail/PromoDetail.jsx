import { useParams, useNavigate, Link } from 'react-router-dom'
import { RiArrowLeftLine, RiHeartLine, RiHeartFill, RiCalendarLine, RiAlertLine, RiMapPinLine } from 'react-icons/ri'
import { getMedioPago, DIAS_SEMANA } from '../../data/catalogo'
import { CIUDADES } from '../../data/promociones-pba'
import { useAppContext } from '../../context/AppContext'
import { usePromoById, useGetSupermercado } from '../../hooks/usePromos'
import styles from './PromoDetail.module.css'

export default function PromoDetail() {
  const { promoId } = useParams()
  const navigate = useNavigate()
  const { toggleFavorito, isFavorito, zona } = useAppContext()
  const getSupermercado = useGetSupermercado()

  const promo = usePromoById(promoId)

  if (!promo) {
    return (
      <div className={styles.notFound}>
        <RiAlertLine className={styles.notFoundIcon} aria-hidden="true" />
        <h1>Promoción no encontrada</h1>
        <Link to="/" className={styles.backLink}>← Volver al inicio</Link>
      </div>
    )
  }

  const super_ = getSupermercado(promo.supermercado)
  const medio = getMedioPago(promo.medioPago)
  const fav = isFavorito(promo.id)

  const diasLabel = promo.dias === null
    ? 'Todos los días'
    : promo.dias.map(d => DIAS_SEMANA[d]?.fullLabel).join(', ')

  const ciudadesLabel = promo.ciudades === null
    ? 'Toda la provincia'
    : promo.ciudades
        .map(cid => CIUDADES.find(c => c.id === cid))
        .filter(Boolean)
        .map(c => `${c.emoji} ${c.label}`)
        .join(' · ')

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Volver">
          <RiArrowLeftLine aria-hidden="true" /> Volver
        </button>

        <article className={styles.card}>
          <header
            className={styles.header}
            style={{ background: `linear-gradient(135deg, ${super_.color}22, var(--color-sky-pale))` }}
          >
            <div className={styles.superRow}>
              <span className={styles.superLogo} style={{ background: super_.color + '22' }}>
                {super_.logo}
              </span>
              <div>
                <h1 className={styles.superName}>{super_.label}</h1>
                <p className={styles.medioName}>{medio.logo} {medio.label}</p>
              </div>
            </div>

            <div className={styles.discountBig}>
              {promo.tipo === 'cuotas' ? (
                <span>{promo.descripcion}</span>
              ) : (
                <>
                  <span className={styles.pct}>{promo.descuento}%</span>
                  <span className={styles.off}>
                    {promo.tipo === 'cashback' ? 'Cashback'
                      : promo.tipo === 'reintegro' ? 'Reintegro'
                      : 'OFF'}
                  </span>
                </>
              )}
            </div>

            <button
              className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
              onClick={() => toggleFavorito(promo.id)}
              aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              aria-pressed={fav}
            >
              {fav ? <RiHeartFill aria-hidden="true" /> : <RiHeartLine aria-hidden="true" />}
              {fav ? 'En favoritos' : 'Guardar'}
            </button>
          </header>

          <div className={styles.body}>
            <Section title="Descripción">
              <p>{promo.descripcion}</p>
            </Section>

            <Section title="Días válidos">
              <p className={styles.infoRow}>
                <RiCalendarLine aria-hidden="true" />
                {diasLabel}
              </p>
            </Section>

            {zona === 'pba' && (
              <Section title="Ciudades">
                <p className={styles.infoRow}>
                  <RiMapPinLine aria-hidden="true" />
                  {ciudadesLabel}
                </p>
              </Section>
            )}

            {promo.tope && (
              <Section title="Tope de descuento">
                <p className={styles.tope}>${promo.tope.toLocaleString('es-AR')} ARS</p>
              </Section>
            )}

            <Section title="Condiciones">
              <p className={styles.condiciones}>{promo.condiciones}</p>
            </Section>

            {promo.vencimiento && (
              <Section title="Vigencia hasta">
                <p>{formatDate(promo.vencimiento)}</p>
              </Section>
            )}

            <div className={styles.alert}>
              <RiAlertLine aria-hidden="true" />
              <p>Verificá las condiciones actualizadas en el supermercado o en la app de tu medio de pago.</p>
            </div>
          </div>
        </article>

        <Link to="/" className={styles.backLink}>← Ver todas las promos</Link>
      </div>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  )
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
}

import PropTypes from 'prop-types'
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
