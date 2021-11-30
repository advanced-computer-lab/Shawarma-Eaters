import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      {' '}
      <input
        value={filterValue || ''}
        placeholder = "   Search"
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}