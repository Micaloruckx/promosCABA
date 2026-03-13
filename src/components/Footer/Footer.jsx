import { RiGithubLine, RiHeart2Line } from 'react-icons/ri'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {year} <strong>PromosCABA</strong> — Ahorrá en cada compra
        </p>
        <p className={styles.disclaimer}>
          Las promociones son informativas. Verificá condiciones en cada punto de venta.
        </p>
        <p className={styles.made}>
          Hecho con <RiHeart2Line className={styles.heart} aria-hidden="true" /> en Buenos Aires
        </p>
      </div>
    </footer>
  )
}
