import { useRef } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useAppContext } from '../../context/AppContext'
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useAppContext()
  const inputRef = useRef(null)

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.wrapper} role="search">
      <label htmlFor="search-promos" className={styles.srOnly}>
        Buscar promoción
      </label>
      <RiSearchLine className={styles.icon} aria-hidden="true" />
      <input
        ref={inputRef}
        id="search-promos"
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Buscar supermercado, tarjeta…"
        className={styles.input}
        autoComplete="off"
        spellCheck="false"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className={styles.clearBtn}
          aria-label="Limpiar búsqueda"
        >
          <RiCloseLine aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
