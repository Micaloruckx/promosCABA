# PromosBA 💳

> Tu guía de ahorro en hipermercados de **CABA y Provincia de Buenos Aires**.
> Elegí tu zona (CABA o Provincia), seleccioná la ciudad (Las Flores, Tandil, Azul, Olavarría, Mar del Plata...) y consultá qué promociones bancarias y billeteras virtuales están disponibles hoy.

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
│   ├── Navbar/            # Sticky con ZonaSelector integrado
│   ├── ZonaSelector/      # Toggle CABA ↔ Provincia
│   ├── CiudadSelector/    # Selector de ciudad (solo zona PBA)
│   ├── DaySelector/       # Selector de día de la semana
│   ├── SearchBar/         # Búsqueda en tiempo real
│   ├── FilterBar/         # Filtros dinámicos por zona
│   ├── PromoCard/         # Tarjeta de cada promoción
│   ├── Loader/
│   └── Footer/
├── context/
│   └── AppContext.jsx     # Estado global: zona, ciudad, día, filtros, favoritos
├── data/
│   ├── catalogo.js        # DIAS_SEMANA, MEDIOS_PAGO, ZONAS — compartido
│   ├── promociones-caba.js  # ⭐ Promos CABA
│   └── promociones-pba.js   # ⭐ Promos PBA (Las Flores, Tandil, interior...)
├── hooks/
│   └── usePromos.js       # Lógica de filtrado zone-aware
└── pages/
    ├── Home/              # Grid de promos
    ├── PromoDetail/       # Detalle con useParams
    ├── Favoritos/         # Guardadas en localStorage
    └── Acerca/            # Info + formulario de sugerencias
```

---

## ✅ Requisitos cubiertos

- [x] Deploy funcional (Vercel)
- [x] Responsive design (320px → 2000px) — Mobile First
- [x] Estilos accesibles (`aria-*`, `role`, `:focus-visible`, contraste AA)
- [x] React 19 + Vite
- [x] Context API (`AppContext` — zona, ciudad, día, filtros, favoritos)
- [x] `useState`, `useMemo`, `useCallback`
- [x] Routing con `react-router-dom` — 4 rutas
- [x] `useParams` en `/promo/:promoId`
- [x] Formulario con validación en `/acerca`
- [x] Componentes reutilizables con CSS Modules
- [x] Hooks personalizados (`usePromos.js`)
- [x] Principios KISS / DRY / YAGNI

---

## 🔧 Cómo actualizar las promos

**CABA:** editá `src/data/promociones-caba.js`
**Provincia:** editá `src/data/promociones-pba.js`

Campos de cada promo:

```js
{
  id: 'pba-tandil-toledo-mp-lun',  // único en todo el proyecto
  supermercado: 'toledo',
  medioPago: 'mercadopago',
  descuento: 20,
  tipo: 'descuento',               // 'descuento'|'cashback'|'cuotas'|'reintegro'
  tope: 2000,                      // ARS, null = sin tope
  dias: [1],                       // 0=Dom...6=Sáb, null = todos los días
  ciudades: ['tandil'],            // solo PBA — null = toda la provincia
  descripcion: '20% OFF en Toledo con Mercado Pago',
  condiciones: 'QR presencial. Tope $2.000.',
  vencimiento: '2025-03-31',       // ISO o null
  destacada: true,
}
```

Para agregar un supermercado nuevo en PBA, agregarlo también en el array `SUPERMERCADOS` de `promociones-pba.js`.
Para agregar una ciudad nueva, agregarla en el array `CIUDADES` del mismo archivo.

---

## ⚙️ Instalación local

```bash
git clone https://github.com/TU_USUARIO/promos-ba.git
cd promos-ba
npm install
npm run dev   # → http://localhost:5173
```

## 🚢 Deploy en Vercel

1. Pusheá el repo a GitHub.
2. Vercel → **New Project** → importá el repo → framework Vite (auto-detectado).
3. Deploy → listo ✅

El `vercel.json` ya maneja el routing SPA.

---

## 📝 Licencia

MIT
