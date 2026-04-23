# 🌍 Guía de i18next en tu Proyecto

## Estructura Creada

```
src/
├── i18n/
│   ├── i18n.js                    # Configuración principal
│   └── locales/
│       ├── es.json               # Traducciones al Español
│       └── en.json               # Traducciones al Inglés
├── hooks/
│   └── useTranslation.js          # Hook personalizado
├── components/
│   └── LanguageSwitcher.jsx       # Selector de idioma
└── page/
    └── IndexExample.jsx           # Ejemplo de uso
```

## ¿Cómo Usarlo?

### 1. **En Cualquier Componente**
```jsx
import { useTranslation } from '../hooks/useTranslation';

export const MiComponente = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>Idioma actual: {i18n.language}</p>
    </div>
  );
};
```

### 2. **Agregar Nuevas Traducciones**

**Paso 1:** Edita `src/i18n/locales/es.json`
```json
{
  "title": "Catálogo de Warframe",
  "miNuevaVariable": "Mi texto en español"
}
```

**Paso 2:** Edita `src/i18n/locales/en.json`
```json
{
  "title": "Warframe Catalog",
  "miNuevaVariable": "My text in English"
}
```

**Paso 3:** Úsalo en tu componente
```jsx
const { t } = useTranslation();
<p>{t('miNuevaVariable')}</p>
```

### 3. **Cambiar Idioma Programáticamente**
```jsx
const { i18n } = useTranslation();

// Cambiar a español
i18n.changeLanguage('es');

// Cambiar a inglés
i18n.changeLanguage('en');

// Obtener idioma actual
console.log(i18n.language); // 'es' o 'en'
```

### 4. **Integrar el Selector en tu Layout**
```jsx
import { LanguageSwitcher } from './components/LanguageSwitcher';

export const App = () => {
  return (
    <div>
      <LanguageSwitcher /> {/* Botones para cambiar idioma */}
      {/* ... resto del contenido ... */}
    </div>
  );
};
```

## Características

✅ Las preferencias se guardan en localStorage  
✅ El idioma persiste al recargar la página  
✅ Fácil de agregar más idiomas  
✅ Ideal para SEO multiidioma  
✅ React nativamente integrado  

## Próximos Pasos

1. **Instala las dependencias cuando estés listo:**
   ```bash
   npm install i18next react-i18next
   ```

2. **Reemplaza los textos en tu componente `Index.jsx`** con las traducciones usando `t('clave')`

3. **Agrega más claves** a los archivos JSON según lo necesites

---

¿Necesitas agregar variables dinámicas a las traducciones? Puedes usar interpolación:

### Ejemplo con Interpolación
**es.json:**
```json
{
  "welcome": "Bienvenido, {{name}}"
}
```

**Componente:**
```jsx
{t('welcome', { name: 'Juan' })}
// Resultado: "Bienvenido, Juan"
```
