import PropTypes from 'prop-types'
import { useAppContext } from '../../context/AppContext'
import { DIAS_SEMANA } from '../../data/catalogo'
import styles from './DaySelector.module.css'

export default function DaySelector() {
  const { diaSeleccionado, setDiaSeleccionado } = useAppContext()
  const hoy = new Date().getDay()

  return (
    <section className={styles.wrapper} aria-label="Seleccionar día">
      <div className={styles.scroll}>
        {DIAS_SEMANA.map(({ id, label, fullLabel }) => {
          const isHoy = id === hoy
          const isActive = id === diaSeleccionado
          return (
            <button
              key={id}
              onClick={() => setDiaSeleccionado(id)}
              className={`${styles.btn} ${isActive ? styles.active : ''} ${isHoy ? styles.hoy : ''}`}
              aria-label={`Ver promos del ${fullLabel}${isHoy ? ' (hoy)' : ''}`}
              aria-pressed={isActive}
            >
              <span className={styles.label}>{label}</span>
              {isHoy && <span className={styles.hoyBadge}>Hoy</span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}

DaySelector.propTypes = {}
