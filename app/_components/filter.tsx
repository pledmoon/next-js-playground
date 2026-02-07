'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const filters = [
  {
    name: 'All cabins',
    value: 'all',
  },
  {
    name: '1—3 guests',
    value: 'small',
  },
  {
    name: '4—7 guests',
    value: 'medium',
  },
  {
    name: '8—12 guests',
    value: 'large',
  },
]

export const Filter = () => {
  // берем роутер для программного перехода
  const router = useRouter()
  // также берем pathName, чтобы руками не писать /cabins
  const pathname = usePathname()
  // берем текущий query string
  const searchParams = useSearchParams()

  const activeFilter = searchParams.get('capacity') ?? 'all'

  const handleFilter = (filter: string) => {
    // 1) создаем новый URLSearchParams (для удобства работы с query string),
    // передаем ему строку с текущими параметрами
    const params = new URLSearchParams(searchParams)

    // 2) устанавливаем или обновляем ключ capacity
    params.set('capacity', filter)

    // 3) если это 'all', не ставим
    if (filter === 'all') {
      params.delete('capacity')
    }

    // 4) собираем строку методом toString (без ?)
    const queryString = params.toString()

    // 5) программно переходим на новый url
    // !!! -> search params изменился? URL поменялся, а если URL меняется, серверный компонент ререндерится (Page.tsx),
    // так как CabinsList дочерний компонент (все дети ререндерятся), он тоже ререндерится и идет за данными заново
    //router.push(`/cabins?${queryString}`)
    router.replace(`${pathname}?${queryString}`, {
      scroll: false,
    })
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map((filter) => (
        <FilterButton
          key={filter.value}
          filter={filter.value}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        >
          {filter.name}
        </FilterButton>
      ))}
    </div>
  )
}

interface FilterButtonProps {
  filter: string
  activeFilter: string
  handleFilter: (filter: string) => void
  children: Readonly<ReactNode>
}

const FilterButton = ({ filter, activeFilter, handleFilter, children }: FilterButtonProps) => {
  return (
    <button
      type="button"
      className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${filter === activeFilter ? 'bg-primary-700 text-primary-50 cursor-default pointer-events-none' : ''}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  )
}
