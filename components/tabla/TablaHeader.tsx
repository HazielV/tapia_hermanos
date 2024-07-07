interface props<T> {
  columns: T[]
  children: (column: T) => React.ReactNode
}
import React from 'react'
export default function TablaHeader<T>({ columns, children }: props<T>) {
  return (
    <thead>
      <tr className="text-left text-xs text-gray-500 capitalize dark:bg-[#1A1D1F]">
        {columns.map((column, index) => (
          <React.Fragment key={index}>{children(column)}</React.Fragment>
        ))}
      </tr>
    </thead>
  )
}
