# PromosCABA 💳

> Tu guía de ahorro en hipermercados de Buenos Aires.  
> Consultá qué promociones bancarias y billeteras virtuales están disponibles hoy, por supermercado y día de la semana.

---

## 🚀 Demo

Deploy en Vercel: _[agregar URL luego del deploy]_

---

## 📦 Stack

| Tecnología | Versión |
|---|---|
| React | 19 |
| Vite | 6 |
| React Router DOM | 6 |
| React Icons | 5 |
| PropTypes | 15 |
| CSS Modules | — |

---

## 🗂 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar/          # Navbar sticky con navegación
│   ├── DaySelector/     # Selector de día de la semana
│   ├── SearchBar/       # Búsqueda de promos
│   ├── FilterBar/       # Filtros por super, medio de pago y tipo
│   ├── PromoCard/       # Tarjeta de cada promoción
│   ├── Loader/          # Spinner de carga
│   └── Footer/          # Pie de página
├── context/
│   └── AppContext.jsx   # Estado global (día, filtros, favoritos)
├── data/
│   └── promociones.js   # ⭐ FUENTE ÚNICA DE VERDAD – editar aquí
├── hooks/
│   └── usePromos.js     # Lógica de filtrado reutilizable
├── pages/
│   ├── Home/            # Listado de promos del día
│   ├── PromoDetail/     # Detalle de promo (useParams)
│   ├── Favoritos/       # Promos guardadas
│   └── Acerca/          # Info + formulario de sugerencias
└── styles/
    └── global.css       # Variables CSS y reset
```

---

## ✅ Requisitos del TP cubiertos

- [x] Deploy funcional (Vercel)
- [x] Responsive design (320px → 2000px) — Mobile First
- [x] Estilos accesibles (contraste, `aria-*`, `role`, `:focus-visible`)
- [x] React 19 + Vite
- [x] Context API (`AppContext`)
- [x] Estados locales y globales (`useState`, `useMemo`, `useCallback`)
- [x] Routing con `react-router-dom` — 4 rutas
- [x] `useParams` en `PromoDetail`
- [x] Formulario con validación (`/acerca`)
- [x] Componentes reutilizables (`PromoCard`, `FilterBar`, `DaySelector`…)
- [x] Hooks personalizados (`usePromos.js`)
- [x] CSS Modules por componente
- [x] Principios KISS / DRY / YAGNI

---

## 🔧 Cómo actualizar las promos

Editá el archivo **`src/data/promociones.js`**. Cada objeto en el array `PROMOCIONES` representa una promo:

```js
{
  id: 'car-mp-lun',          // string único
  supermercado: 'carrefour', // id de SUPERMERCADOS
  medioPago: 'mercadopago',  // id de MEDIOS_PAGO
  descuento: 20,             // número (%)
  tipo: 'descuento',         // 'descuento' | 'cashback' | 'cuotas' | 'reintegro'
  tope: 2000,                // tope en ARS (null = sin tope)
  dias: [1],                 // días de semana 0=Dom...6=Sáb (null = todos)
  descripcion: '20% OFF con Mercado Pago',
  condiciones: 'Tope $2.000. Una transacción por usuario.',
  vencimiento: '2025-03-31', // ISO o null
  destacada: true,           // aparece primero y resaltada
}
```

---

## 📝 Backlog y fuente de datos

- **Actualización manual:** Las promociones se actualizan editando el archivo `src/data/promociones.js`. Es la fuente única de verdad.
- **Automatización futura:** Se planea integrar una API o Google Sheets para actualización automática.
- **Login y guardado:** Próxima integración con Firebase para login admin y guardado de datos/promos.
- **Suscripción:** Se agregará funcionalidad para suscripción de correos y novedades.

---

## 🚢 Deploy en Vercel

1. Pusheá el repo a GitHub.
2. Entrá a [vercel.com](https://vercel.com) → **New Project** → importá el repo.
3. Framework: **Vite** (auto-detectado).
4. Deploy → listo ✅

El archivo `vercel.json` ya está configurado para que el routing SPA funcione correctamente.

---

## 📝 Licencia

MIT
