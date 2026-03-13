import { useAppContext } from '../../context/AppContext'
import { ZONAS } from '../../data/catalogo'
import styles from './ZonaSelector.module.css'

export default function ZonaSelector() {
  const { zona, setZona } = useAppContext()

  return (
    <div className={styles.wrapper} role="group" aria-label="Seleccionar zona">
      {ZONAS.map(z => (
        <button
          key={z.id}
          onClick={() => setZona(z.id)}
          className={`${styles.btn} ${zona === z.id ? styles.active : ''}`}
          aria-pressed={zona === z.id}
          aria-label={z.fullLabel}
        >
          <span className={styles.emoji} aria-hidden="true">{z.emoji}</span>
          <span className={styles.label}>{z.label}</span>
        </button>
      ))}
    </div>
  )
}
