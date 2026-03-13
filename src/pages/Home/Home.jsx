import { useMemo } from 'react'
import { RiEmotionSadLine } from 'react-icons/ri'
import DaySelector from '../../components/DaySelector/DaySelector'
import FilterBar from '../../components/FilterBar/FilterBar'
import SearchBar from '../../components/SearchBar/SearchBar'
import PromoCard from '../../components/PromoCard/PromoCard'
import { usePromosFiltradas } from '../../hooks/usePromos'
import { useAppContext } from '../../context/AppContext'
import { DIAS_SEMANA } from '../../data/promociones'
import styles from './Home.module.css'

export default function Home() {
  const { diaSeleccionado, resetFiltros, searchQuery } = useAppContext()
  const { promos, visible, total } = usePromosFiltradas()
  const diaLabel = DIAS_SEMANA[diaSeleccionado]?.fullLabel ?? 'hoy'
  const hoy = new Date().getDay()
  const esHoy = diaSeleccionado === hoy

  return (
    <div className={styles.page}>
      {/* Sticky controls block */}
      <div className={styles.sticky}>
        <DaySelector />
        <div className={styles.searchRow}>
          <div className={styles.container}>
            <SearchBar />
          </div>
        </div>
        <FilterBar />
      </div>

      {/* Content */}
      <main className={styles.main} id="main-content">
        <div className={styles.container}>
          {/* Heading */}
          <div className={styles.heading}>
            <h1 className={styles.title}>
              {esHoy ? '🗓️ Hoy' : `📅 ${diaLabel}`}
              <span className={styles.titleSub}> — {visible} promo{visible !== 1 ? 's' : ''}</span>
            </h1>
            <p className={styles.subtitle}>
              {esHoy
                ? `Aprovechá estas promociones disponibles hoy en CABA`
                : `Promociones disponibles los ${diaLabel.toLowerCase()} en CABA`}
            </p>
          </div>

          {/* Grid */}
          {promos.length > 0 ? (
            <section
              className={styles.grid}
              aria-label={`${visible} promociones disponibles`}
            >
              {promos.map(promo => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </section>
          ) : (
            <EmptyState onReset={resetFiltros} query={searchQuery} />
          )}
        </div>
      </main>
    </div>
  )
}

function EmptyState({ onReset, query }) {
  return (
    <div className={styles.empty} role="alert">
      <RiEmotionSadLine className={styles.emptyIcon} aria-hidden="true" />
      <h2 className={styles.emptyTitle}>Sin resultados</h2>
      <p className={styles.emptyText}>
        {query
          ? `No encontramos promos para "${query}".`
          : 'No hay promociones con los filtros aplicados.'}
      </p>
      <button className={styles.emptyBtn} onClick={onReset}>
        Limpiar filtros
      </button>
    </div>
  )
}

import PropTypes from 'prop-types'
EmptyState.propTypes = {
  onReset: PropTypes.func.isRequired,
  query: PropTypes.string,
}
