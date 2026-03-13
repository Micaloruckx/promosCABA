import { useState } from 'react'
import PropTypes from 'prop-types'
import { RiFilterLine, RiFilterOffLine } from 'react-icons/ri'
import { useAppContext } from '../../context/AppContext'
import { MEDIOS_PAGO } from '../../data/catalogo'
import styles from './FilterBar.module.css'

const TIPOS = [
  { id: 'descuento', label: '% Descuento' },
  { id: 'cashback',  label: 'Cashback' },
  { id: 'cuotas',    label: 'Cuotas s/i' },
  { id: 'reintegro', label: 'Reintegro' },
]

export default function FilterBar({ supermercados }) {
  const {
    filtroSuper, setFiltroSuper,
    filtroMedio, setFiltroMedio,
    filtroTipo,  setFiltroTipo,
    resetFiltros,
  } = useAppContext()
  const [open, setOpen] = useState(false)

  const hayFiltros = filtroSuper.length > 0 || filtroMedio.length > 0 || filtroTipo.length > 0
  const totalFiltros = filtroSuper.length + filtroMedio.length + filtroTipo.length

  const toggleItem = (setter, current, id) =>
    setter(current.includes(id) ? current.filter(x => x !== id) : [...current, id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <button
          className={`${styles.toggleBtn} ${hayFiltros ? styles.active : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="filter-panel"
        >
          <RiFilterLine aria-hidden="true" />
          <span>Filtros</span>
          {hayFiltros && <span className={styles.badge}>{totalFiltros}</span>}
        </button>

        {hayFiltros && (
          <button className={styles.resetBtn} onClick={resetFiltros} aria-label="Limpiar filtros">
            <RiFilterOffLine aria-hidden="true" />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      {open && (
        <div className={styles.panel} id="filter-panel" role="group" aria-label="Filtros">
          <FilterGroup
            label="Supermercado"
            items={supermercados}
            selected={filtroSuper}
            onToggle={(id) => toggleItem(setFiltroSuper, filtroSuper, id)}
          />
          <FilterGroup
            label="Tipo de promo"
            items={TIPOS}
            selected={filtroTipo}
            onToggle={(id) => toggleItem(setFiltroTipo, filtroTipo, id)}
          />
          <FilterGroup
            label="Medio de pago"
            items={MEDIOS_PAGO}
            selected={filtroMedio}
            onToggle={(id) => toggleItem(setFiltroMedio, filtroMedio, id)}
            small
          />
        </div>
      )}
    </div>
  )
}

FilterBar.propTypes = {
  supermercados: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    logo: PropTypes.string,
  })).isRequired,
}

function FilterGroup({ label, items, selected, onToggle, small = false }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{label}</p>
      <div className={styles.chips}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`${styles.chip} ${selected.includes(item.id) ? styles.chipActive : ''} ${small ? styles.chipSmall : ''}`}
            aria-pressed={selected.includes(item.id)}
          >
            {item.logo && <span aria-hidden="true">{item.logo}</span>}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

FilterGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  small: PropTypes.bool,
}
