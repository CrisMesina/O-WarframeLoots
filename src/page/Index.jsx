import React, { useEffect, useState } from 'react'

// importacion sweet alert2
import Swal from 'sweetalert2'

export const Index = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('desc') // 'asc' o 'desc'
    const [rarityFilter, setRarityFilter] = useState('all')
    const [placeFilter, setPlaceFilter] = useState('all')
    const [relicFilter, setRelicFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPorPagina = 9


    // Sweet Alert para mostrar mensaje de bienvenida

    



    

    useEffect(() => {
        // Función asíncrona para llamar a la API
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.warframestat.us/drops/');
                const result = await response.json();
                setData(result); // Guardar datos en el estado
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const rarityOptions = Array.from(new Set(data.map(item => item.rarity).filter(Boolean))).sort()

    const filteredAndSortedData = data
        .filter(item => item.item?.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(item => rarityFilter === 'all' || item.rarity === rarityFilter)
        .filter(item => placeFilter === 'all' || item.place === placeFilter)
        .filter(item => relicFilter === 'all' || item.item?.toLowerCase().includes('relic'))
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return (Number(a.chance) || 0) - (Number(b.chance) || 0)
            } else {
                return (Number(b.chance) || 0) - (Number(a.chance) || 0)
            }
        });

    const totalPaginas = Math.max(1, Math.ceil(filteredAndSortedData.length / itemsPorPagina))
    const ultimoItem = currentPage * itemsPorPagina
    const primerItem = ultimoItem - itemsPorPagina
    const currentItems = filteredAndSortedData.slice(primerItem, ultimoItem)

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPaginas) return
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, sortOrder, rarityFilter, placeFilter, relicFilter])


    useEffect(() => {
        Swal.fire({
        title: '¡Bienvenido a Item Loots Warframe!',
        text: 'Desafortunadamente por el momento solo se pueden buscar por nombre del item en ingles. ¡Pero no te preocupes! Puedes usar Google Translate para traducir el nombre del item al ingles y así encontrarlo fácilmente.', 
        icon: 'info',
        confirmButtonText: '¡Vamos allá!'
    })
    }, [])

    return (
        <>
            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <div>
                    <h1 className='text-center text-5xl font-bold'>Item Loots Warframe</h1>
                    <div className='text-center my-4'>
                        <input
                            type='text'
                            placeholder='Buscar por nombre del item...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border border-gray-300 px-4 py-2 rounded mr-4 mb-2 sm:mb-0'
                        />
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            Ordenar por chance: {sortOrder === 'asc' ? 'Menor a Mayor' : 'Mayor a Menor'}
                        </button>
                    </div>
                    <div className='flex flex-wrap justify-center gap-3 bg-black mb-4'>
                        <select
                            value={rarityFilter}
                            onChange={(e) => setRarityFilter(e.target.value)}
                            className='border border-gray-300 px-4 py-2 rounded'
                        >
                            <option value='all' className='bg-black'>Todas las rarezas</option>
                            {rarityOptions.map(rarity => (
                                <option key={rarity} className='bg-black' value={rarity}>{rarity}</option>
                            ))}
                        </select>
                        <select
                            value={relicFilter}
                            onChange={(e) => setRelicFilter(e.target.value)}
                            className='border border-gray-300 px-4 py-2 rounded'
                        >
                            <option value='all' className='bg-black'>Todos los items</option>
                            <option value='relics' className='bg-black'>Sólo reliquias</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                        {currentItems.map((item, i) => (
                            <div key={i} className={` text-white rounded w-96 p-5 mx-auto border shadow text-center`}>

                                <img src={`${item.item.includes('Relic') ? '/IconRelic.png' : ''}`} className='w-30 mx-auto' alt="" />
                                <p className='font-semibold'>{item.item}</p>
                                <h1 className='text-xl'>{item.chance}%</h1>
                                <p>{item.place}</p>
                                <p>{item.rarity}</p>
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-center items-center gap-2 flex-wrap my-10 text-black'>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className='px-3 py-2 rounded bg-gray-200 disabled:opacity-50'
                        >
                            Anterior
                        </button>
                        
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPaginas}
                            className='px-3 py-2 rounded bg-gray-200 disabled:opacity-50'
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

