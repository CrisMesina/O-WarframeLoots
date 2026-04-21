import React, { useEffect, useState } from 'react'

// importacion sweet alert2
import Swal from 'sweetalert2'

export const Index = () => {
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
                console.error('Error al obtener datos:', error)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

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
            title: '¡Bienvenido a Item Loots Warframe!',
            text: 'Por ahora solo se puede buscar por nombre del item en inglés. Usa Google Translate si necesitas traducir el nombre.',
            icon: 'info',
            background: '#0b1726',
            color: '#e2e8f0',
            confirmButtonText: '¡Vamos allá!',
            confirmButtonColor: '#22d3ee',
            customClass: {
                popup: 'swal2-custom-popup',
                title: 'swal2-custom-title',
                content: 'swal2-custom-content',
                confirmButton: 'swal2-custom-confirm'
            }
        })
    }, [])

    return (
        <div className='min-h-screen bg-page text-white'>
            {loading ? (
                <div className='container mx-auto px-4 py-24 text-center'>
                    <p className='text-xl font-medium text-slate-200'>Cargando datos...</p>
                </div>
            ) : (
                <div className='container mx-auto px-4 pb-16'>
                    <section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:px-10 sm:py-14 mb-10'>
                        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_32%)]' />
                        <div className='relative'>
                            <span className='inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-1 text-sm font-semibold text-cyan-100'>Buscador de loot moderno</span>
                            <h1 className='mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl'>Item Loots Warframe</h1>
                            <p className='mt-4 max-w-3xl text-slate-300'>Encuentra loot de Warframe rápido y con estilo. Filtra por nombre, rareza y reliquias, y navega resultados en tarjetas limpias y modernas.</p>

                            <div className='mt-8 flex flex-wrap gap-3 text-sm text-slate-200'>
                                <span className='badge'>Items totales: {data.length}</span>
                                <span className='badge'>Resultados: {filteredAndSortedData.length}</span>
                                <span className='badge'>Página {currentPage} / {totalPaginas}</span>
                            </div>
                        </div>
                    </section>

                    <div className='grid gap-5 lg:grid-cols-[1.8fr_1fr] mb-8'>
                        <div className='rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl'>
                            <label className='block text-sm font-semibold text-slate-200 mb-3'>Buscar item</label>
                            <input
                                type='text'
                                placeholder='Escribe el nombre del item en inglés...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20'
                            />

                            <div className='mt-6 grid gap-3 sm:grid-cols-2'>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className='btn-primary w-full rounded-2xl py-3 text-sm font-semibold'
                                >
                                    {sortOrder === 'asc' ? 'Ordenar chance ↑' : 'Ordenar chance ↓'}
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className='btn-secondary w-full rounded-2xl py-3 text-sm font-semibold'
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        </div>

                        <div className='rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl'>
                            <p className='text-sm font-semibold text-slate-200 mb-4'>Filtrar resultados</p>
                            <div className='grid gap-4'>
                                <select
                                    value={rarityFilter}
                                    onChange={(e) => setRarityFilter(e.target.value)}
                                    className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none'
                                >
                                    <option value='all'>Todas las rarezas</option>
                                    {rarityOptions.map(rarity => (
                                        <option key={rarity} value={rarity}>{rarity}</option>
                                    ))}
                                </select>
                                <select
                                    value={relicFilter}
                                    onChange={(e) => setRelicFilter(e.target.value)}
                                    className='input-glass w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none'
                                >
                                    <option value='all'>Todos los items</option>
                                    <option value='relics'>Sólo reliquias</option>
                                    <option value='prime'>Sólo primes</option>
                                    <option value='blueprint'>Sólo planos</option>
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
                                        <p className='text-sm font-medium uppercase tracking-[0.18em] text-cyan-200'>Chance</p>
                                        <h2 className='mt-2 text-3xl font-bold text-white'>{item.chance || '—'}%</h2>
                                    </div>
                                    <span className='badge text-sm'>{item.rarity || 'Sin rareza'}</span>
                                </div>

                                <div className='space-y-4'>
                                    <p className='text-2xl font-semibold text-slate-50'>{item.item || 'Nombre no disponible'}</p>
                                    <p className='text-sm text-slate-400'>Lugar: <span className='text-slate-200'>{item.place || 'Desconocido'}</span></p>
                                    <p className='text-sm text-slate-400'>Tipo: <span className='text-slate-200'>{item.item?.toLowerCase().includes('relic') ? 'Reliquia' : 'Loot normal'}</span></p>
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
                            Anterior
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPaginas}
                            className='pagination-button disabled:opacity-50'
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

