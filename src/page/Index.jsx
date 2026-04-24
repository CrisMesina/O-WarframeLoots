import React, { useEffect, useState } from 'react'

// importacion sweet alert2
import Swal from 'sweetalert2'
//import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { Navbar } from '../components/Navbar'
import { useTranslation } from '../hooks/useTranslation'
import { translateApiValue, translateItemName } from '../i18n/apiTranslations'

export const Index = ({ onBackToLanding }) => {
    const { t, i18n } = useTranslation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('desc') // 'asc' o 'desc'


    // Filtros 

    const [rarityFilter, setRarityFilter] = useState('all')
    const [relicFilter, setRelicFilter] = useState('all')
    const [primesFilter, setPrimesFilter] = useState('all')

    // Paginacion
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPorPagina = 9

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.warframestat.us/drops/')
                const result = await response.json()
                setData(result)
                setLoading(false)
            } catch (error) {
                console.error(t('errorFetching'), error)
                setLoading(false)
            }
        }

        fetchData()
    }, [t])

    const rarityOptions = Array.from(new Set(data.map(item => item.rarity).filter(Boolean))).sort()

    const filteredAndSortedData = data
        .filter(item => item.item?.toLowerCase().includes(searchTerm.toLowerCase()))
        // Filtrado por rareza
        .filter(item => rarityFilter === 'all' || item.rarity === rarityFilter)
        // Opciones de filtrado para el Select
        .filter(item => {
            if (relicFilter === 'all') return true;
            if (relicFilter === 'relics') return item.item?.toLowerCase().includes('relic');
            if (relicFilter === 'prime') return item.item?.toLowerCase().includes('prime');
            if (relicFilter === 'blueprint') return item.item?.toLowerCase().includes('blueprint');
            return true;
        })
        .filter(item => primesFilter === 'all' || item.item?.toLowerCase().includes('prime'))
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return (Number(a.chance) || 0) - (Number(b.chance) || 0)
            }
            return (Number(b.chance) || 0) - (Number(a.chance) || 0)
        })

    const totalPaginas = Math.max(1, Math.ceil(filteredAndSortedData.length / itemsPorPagina))
    const ultimoItem = currentPage * itemsPorPagina
    const primerItem = ultimoItem - itemsPorPagina
    const currentItems = filteredAndSortedData.slice(primerItem, ultimoItem)

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPaginas) return
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const clearFilters = () => {
        setSearchTerm('')
        setRarityFilter('all')
        setRelicFilter('all')
        setPrimesFilter('all')
        setSortOrder('desc')
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, sortOrder, rarityFilter, relicFilter, primesFilter])

    const getItemImage = (itemName) => {
        
        const name = itemName.toLowerCase()
        
        if (name.includes('relic')) {
            return '/IconRelic.png'
        } else if (name.includes('blueprint')) {
            return '/IconBlueprint.png'
        } else if (name.includes('prime')) {
            return '/images/prime.png'
        } else if (name.includes('credits')){
            return '/IconPurchase.png'
        } else if(name.includes('arcane')) {
            return '/IconArcane.png'
        } else {
            return '/IconDefault.png'
        }
    }

    useEffect(() => {
        Swal.fire({
            title: t('welcomeTitle'),
            text: t('welcomeText'),
            icon: 'info',
            background: '#0b1726',
            color: '#e2e8f0',
            confirmButtonText: t('welcomeButton'),
            confirmButtonColor: '#22d3ee',
            customClass: {
                popup: 'swal2-custom-popup',
                title: 'swal2-custom-title',
                content: 'swal2-custom-content',
                confirmButton: 'swal2-custom-confirm'
            }
        })
    }, [, t])
    // i18n.language
    return (
        <div className='min-h-screen bg-page text-white'>
            <Navbar onLogoClick={onBackToLanding} />
            {loading ? (
                <div className='container mx-auto px-4 py-24 text-center'>
                    <p className='text-xl font-medium text-slate-200'>{t('loading')}</p>
                </div>
            ) : (
                <div className='container mx-auto mt-10 px-4 pb-16'>
                    <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:px-10 sm:py-14 mb-10'>
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_32%)]' />
                        {/*
                            <div className='absolute top-6 right-6 sm:top-10 sm:right-10'>
                                <LanguageSwitcher />
                            </div>

                        */}
                        <div className='relative'>
                            <span className='inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-1 text-sm font-semibold text-cyan-100'>{t('mainBadge')}</span>
                            <h1 className='mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl'>{t('mainTitle')}</h1>
                            <p className='mt-4 max-w-3xl text-slate-300'>{t('mainDescription')}</p>

                            <div className='mt-8 flex flex-wrap gap-3 text-sm text-slate-200'>
                                <span className='badge'>{t('totalItems')}: {data.length}</span>
                                <span className='badge'>{t('results')}: {filteredAndSortedData.length}</span>
                                <span className='badge'>{t('page')} {currentPage} / {totalPaginas}</span>
                            </div>
                        </div>
                    </section>

                    <div className='grid gap-5 lg:grid-cols-[1.8fr_1fr] mb-8'>
                        <div className='rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl'>
                            <label className='block text-sm font-semibold text-slate-200 mb-3'>{t('searchLabel')}</label>
                            <input
                                type='text'
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20'
                            />

                            <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className='btn-primary w-full rounded-2xl py-3 text-sm font-semibold'
                                >
                                    {sortOrder === 'asc' ? t('sortChanceAsc') : t('sortChanceDesc')}
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className='btn-secondary w-full rounded-2xl py-3 text-sm font-semibold'
                                >
                                    {t('clearFilters')}
                                </button>
                            </div>
                        </div>

                        <div className='rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl'>
                            <p className='text-sm font-semibold text-slate-200 mb-4'>{t('filterResults')}</p>
                            <div className='grid gap-4'>
                                <select
                                    value={rarityFilter}
                                    onChange={(e) => setRarityFilter(e.target.value)}
                                    className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none'
                                >
                                    <option value='all'>{t('allRarities')}</option>
                                    {rarityOptions.map(rarity => (
                                        <option key={rarity} value={rarity}>{translateApiValue(rarity)}</option>
                                    ))}
                                </select>
                                <select
                                    value={relicFilter}
                                    onChange={(e) => setRelicFilter(e.target.value)}
                                    className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none'
                                >
                                    <option value='all'>{t('allItems')}</option>
                                    <option value='relics'>{t('onlyRelics')}</option>
                                    <option value='prime'>{t('onlyPrimes')}</option>
                                    <option value='blueprint'>{t('onlyBlueprints')}</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    {/* MUESTRA DE ITEMS */}


                    <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                        {currentItems.map((item, i) => (
                            <article key={i} className='group rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_25px_75px_-30px_rgba(14,165,233,0.65)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/10'>
                                <div className='mb-4 rounded-xl overflow-hidden bg-white/10 border border-white/10 h-40 flex items-center justify-center'>
                                    <img src={getItemImage(item.item)} alt={item.item} className='w-full h-full object-cover' />
                                </div>

                                <div className='flex items-center justify-between gap-3 mb-5'>
                                    <div>
                                        <p className='text-sm font-medium uppercase tracking-[0.18em] text-cyan-200'>{t('chance')}</p>
                                        <h2 className='mt-2 text-3xl font-bold text-white'>{item.chance || '—'}%</h2>
                                    </div>
                                    <span className='badge text-sm'>{translateApiValue(item.rarity) || t('noRarity')}</span>
                                </div>

                                <div className='space-y-4'>
                                    <p className='text-2xl font-semibold text-slate-50'>{translateItemName(item.item) || t('noName')}</p>
                                    <p className='text-sm text-slate-400'>{t('location')}: <span className='text-slate-200'>{item.place || t('unknown')}</span></p>
                                    <p className='text-sm text-slate-400'>{t('type')}: <span className='text-slate-200'>{item.item?.toLowerCase().includes('relic') ? t('relic') : t('normalLoot')}</span></p>
                                </div>
                            </article>
                        ))}
                    </div>

                        {/* BOTONES PARA CAMBIAR PAGINA  */}

                    <div className='mt-12 flex flex-wrap items-center justify-center gap-3'>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='pagination-button disabled:opacity-50'
                        >
                            {t('previous')}
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPaginas}
                            className='pagination-button disabled:opacity-50'
                        >
                            {t('next')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

