import styles from './Loader.module.css'

export default function Loader({ text = 'Cargando…' }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true">
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

import PropTypes from 'prop-types'
Loader.propTypes = {
  text: PropTypes.string,
}
