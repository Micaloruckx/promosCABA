import { Link } from 'react-router-dom'
import { RiHeartLine } from 'react-icons/ri'
import PromoCard from '../../components/PromoCard/PromoCard'
import { usePromosFavoritas } from '../../hooks/usePromos'
import styles from './Favoritos.module.css'

export default function Favoritos() {
  const favoritas = usePromosFavoritas()

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <RiHeartLine className={styles.titleIcon} aria-hidden="true" />
            Mis Favoritos
          </h1>
          <p className={styles.subtitle}>
            {favoritas.length > 0
              ? `Guardaste ${favoritas.length} promo${favoritas.length !== 1 ? 's' : ''}`
              : 'Guardá tus promos preferidas tocando ❤️'}
          </p>
        </header>

        {favoritas.length > 0 ? (
          <section
            className={styles.grid}
            aria-label={`${favoritas.length} promociones favoritas`}
          >
            {favoritas.map(promo => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </section>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji} aria-hidden="true">💔</span>
            <h2 className={styles.emptyTitle}>Sin favoritos aún</h2>
            <p className={styles.emptyText}>
              Explorá las promos de hoy y guardá las que más te convengan.
            </p>
            <Link to="/" className={styles.cta}>Ver promos de hoy</Link>
          </div>
        )}
      </div>
    </main>
  )
}
