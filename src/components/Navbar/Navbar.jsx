import { NavLink } from 'react-router-dom'
import { RiStoreLine, RiHeartLine, RiInformationLine, RiCoupon2Line } from 'react-icons/ri'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Navegación principal">
        <div className={styles.brand}>
          <RiCoupon2Line className={styles.brandIcon} aria-hidden="true" />
          <span className={styles.brandName}>PromosCABA</span>
        </div>

        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
              aria-label="Inicio"
            >
              <RiStoreLine className={styles.linkIcon} aria-hidden="true" />
              <span className={styles.linkLabel}>Promos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
              aria-label="Favoritos"
            >
              <RiHeartLine className={styles.linkIcon} aria-hidden="true" />
              <span className={styles.linkLabel}>Favoritos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/acerca"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
              aria-label="Acerca de"
            >
              <RiInformationLine className={styles.linkIcon} aria-hidden="true" />
              <span className={styles.linkLabel}>Acerca</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
