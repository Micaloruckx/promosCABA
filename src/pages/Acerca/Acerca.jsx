import { useState } from 'react'
import { RiSendPlane2Line, RiCheckboxCircleLine, RiStoreLine, RiCalendarLine, RiHeartLine } from 'react-icons/ri'
import styles from './Acerca.module.css'

const INITIAL_FORM = { nombre: '', email: '', supermercado: '', mensaje: '' }

export default function Acerca() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'Por favor ingresá tu nombre.'
    if (!form.email.trim()) errs.email = 'Por favor ingresá tu email.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'El email no es válido.'
    if (!form.mensaje.trim()) errs.mensaje = 'Por favor ingresá un mensaje.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // En producción: enviar a backend / Formspree / EmailJS
    setSubmitted(true)
    setForm(INITIAL_FORM)
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>PromosCABA</h1>
          <p className={styles.heroSub}>Tu guía de ahorro en hipermercados de Buenos Aires</p>
        </section>

        {/* Features */}
        <section className={styles.features} aria-label="Características">
          <Feature icon={<RiCalendarLine />} title="Actualizado a diario">
            Las promos bancarias se cargan y verifican cada día. Siempre vas a ver las vigentes.
          </Feature>
          <Feature icon={<RiStoreLine />} title="Todos los supers">
            Carrefour, Coto, DIA, Jumbo, Disco, Vea y más. Todo en un solo lugar.
          </Feature>
          <Feature icon={<RiHeartLine />} title="Guardá tus favoritas">
            Marcá las promos que más usás y accedé rápido sin buscar de nuevo.
          </Feature>
        </section>

        {/* ¿Cómo se actualiza? */}
        <section className={styles.howTo}>
          <h2 className={styles.sectionTitle}>¿Cómo se actualizan las promos?</h2>
          <div className={styles.howToBody}>
            <p>
              Las promociones bancarias en supermercados se renuevan mensualmente (a veces quincenalmente).
              La fuente primaria son los sitios oficiales de cada banco y billetera virtual, más los comunicados
              de los propios supermercados.
            </p>
            <p>
              <strong>Para mantenerlo actualizado</strong>, el archivo <code>src/data/promociones.js</code> es
              la única fuente de verdad. Cualquier colaborador puede abrir un PR en GitHub modificando ese archivo.
              En el futuro se puede conectar a una API o Google Sheet para actualización automática.
            </p>
            <ul className={styles.list}>
              <li>✅ Banco Nación — <a href="https://www.bna.com.ar" target="_blank" rel="noreferrer">bna.com.ar</a></li>
              <li>✅ Mercado Pago — <a href="https://www.mercadopago.com.ar/promociones" target="_blank" rel="noreferrer">mercadopago.com.ar/promociones</a></li>
              <li>✅ MODO — <a href="https://www.modo.com.ar/beneficios" target="_blank" rel="noreferrer">modo.com.ar/beneficios</a></li>
              <li>✅ Carrefour — <a href="https://www.carrefour.com.ar/promociones" target="_blank" rel="noreferrer">carrefour.com.ar/promociones</a></li>
            </ul>
          </div>
        </section>

        {/* Stack */}
        <section className={styles.stack}>
          <h2 className={styles.sectionTitle}>Stack técnico</h2>
          <div className={styles.pills}>
            {['React 19', 'Vite', 'React Router DOM', 'React Icons', 'PropTypes', 'CSS Modules'].map(t => (
              <span key={t} className={styles.pill}>{t}</span>
            ))}
          </div>
        </section>

        {/* Formulario de sugerencias */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Sugerí una promoción</h2>
          <p className={styles.formDesc}>
            ¿Encontraste una promo que no está? Contanos y la agregamos.
          </p>

          {submitted ? (
            <div className={styles.success} role="alert">
              <RiCheckboxCircleLine className={styles.successIcon} aria-hidden="true" />
              <div>
                <strong>¡Gracias!</strong>
                <p>Recibimos tu sugerencia. La revisamos y actualizamos pronto.</p>
              </div>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              aria-label="Formulario de sugerencia de promoción"
              noValidate
            >
              <div className={styles.row}>
                <FormField
                  label="Tu nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  error={errors.nombre}
                  placeholder="Ej: María García"
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <FormField
                label="Supermercado (opcional)"
                name="supermercado"
                type="text"
                value={form.supermercado}
                onChange={handleChange}
                placeholder="Ej: Carrefour, Coto…"
              />

              <FormField
                label="Descripción de la promo"
                name="mensaje"
                type="textarea"
                value={form.mensaje}
                onChange={handleChange}
                error={errors.mensaje}
                placeholder="Ej: 25% OFF en Disco con tarjeta Galicia los miércoles, tope $2.500"
                required
              />

              <button type="submit" className={styles.submitBtn}>
                <RiSendPlane2Line aria-hidden="true" />
                Enviar sugerencia
              </button>
            </form>
          )}
        </section>

      </div>
    </main>
  )
}

/* ---- Sub-componentes ---- */
import PropTypes from 'prop-types'

function Feature({ icon, title, children }) {
  return (
    <div className={styles.feature}>
      <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{children}</p>
    </div>
  )
}
Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

function FormField({ label, name, type, value, onChange, error, placeholder, required }) {
  const id = `field-${name}`
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}{required && <span className={styles.req} aria-hidden="true"> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-required={required}
          rows={4}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-required={required}
          autoComplete={type === 'email' ? 'email' : 'off'}
        />
      )}
      {error && (
        <p id={`${id}-error`} className={styles.errorMsg} role="alert">{error}</p>
      )}
    </div>
  )
}
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
}
