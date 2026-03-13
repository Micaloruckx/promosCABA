import { useAppContext } from '../../context/AppContext'
import { CIUDADES } from '../../data/promociones-pba'
import styles from './CiudadSelector.module.css'

export default function CiudadSelector() {
  const { ciudadSeleccionada, setCiudadSeleccionada, zona } = useAppContext()

  // Solo se renderiza en zona PBA
  if (zona !== 'pba') return null

  return (
    <section className={styles.wrapper} aria-label="Seleccionar ciudad">
      <div className={styles.scroll}>
        {CIUDADES.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setCiudadSeleccionada(id)}
            className={`${styles.btn} ${ciudadSeleccionada === id ? styles.active : ''}`}
            aria-pressed={ciudadSeleccionada === id}
            aria-label={label}
          >
            <span aria-hidden="true">{emoji}</span>
            <span className={styles.label}>{label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
