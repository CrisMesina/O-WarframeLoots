import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

/**
 * EJEMPLO DE CÓMO USAR i18next EN TU COMPONENTE
 * 
 * Solo necesitas:
 * 1. Importar el hook: import { useTranslation } from '../hooks/useTranslation'
 * 2. Usar en el componente: const { t, i18n } = useTranslation()
 * 3. Reemplazar strings con: t('clave') 
 * 4. Agregar claves nuevas en los archivos locales/es.json y locales/en.json
 */

export const IndexExample = () => {
    const { t } = useTranslation() // Obtener función de traducción
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('desc')

    // ... resto del código igual ...

    return (
        <div className="p-6">
            {/* SELECTOR DE IDIOMA */}
            <div className="mb-6 flex justify-end">
                <LanguageSwitcher />
            </div>

            {/* TÍTULO TRADUCIDO */}
            <h1 className="text-4xl font-bold mb-8">
                {t('title')} {/* "Catálogo de Warframe" o "Warframe Catalog" */}
            </h1>

            {/* BÚSQUEDA CON PLACEHOLDER TRADUCIDO */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder={t('search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />
            </div>

            {/* CARGAR DATOS - MOSTRAR ESTADO TRADUCIDO */}
            {loading && <p className="text-center text-gray-500">{t('loading')}</p>}
            {!loading && data.length === 0 && <p>{t('noResults')}</p>}

            {/* BOTÓN LIMPIAR FILTROS TRADUCIDO */}
            <button
                onClick={() => { /* ... */ }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                {t('clearFilters')}
            </button>

            {/* ORDENAMIENTO TRADUCIDO */}
            <div className="mt-4">
                <label>{t('sortBy')}</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">{t('sortAsc')}</option>
                    <option value="desc">{t('sortDesc')}</option>
                </select>
            </div>
        </div>
    )
}
