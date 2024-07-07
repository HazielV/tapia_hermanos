import React, { Children } from 'react'

interface props {
  children: JSX.Element | JSX.Element[]
  paginacion?: JSX.Element
  titulo?: string
  valor_buscardor?: string
  buscador?: boolean
  Btn?: JSX.Element
  funcion_buscador?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function Tabla({
  children,
  paginacion,
  titulo,
  buscador,
  valor_buscardor,
  Btn,
  funcion_buscador,
}: props) {
  return (
    <div className="p-2 dark:bg-[#111315] m-2 rounded-md ">
      {titulo && (
        <div
          className={
            'text-sm font-medium first-letter:uppercase relative mb-2 '
          }
        >
          {titulo}
        </div>
      )}
      <div className="overflow-x-auto dark:border-[#111315]  ">
        {buscador ||
          (Btn && (
            <div
              className={
                'flex ' + (buscador ? ' justify-between' : ' justify-end')
              }
            >
              {buscador && (
                <div className="flex bg-gray-50 text-gray-400 focus-within:bg-white focus-within:text-indigo-600 items-center px-2 border border-gray-200/60 rounded-lg gap-2 dark:bg-[#111315] dark:focus-within:text-indigo-500  w-full md:w-1/3   p-2 m-2 focus-within:outline focus-within:outline-[2px] focus-within:outline-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={valor_buscardor}
                    onChange={funcion_buscador}
                    placeholder="buscar"
                    className="ring-0 w-full outline-none bg-transparent text-black dark:text-white  "
                  />
                </div>
              )}
              <div className="p-2 ">{Btn}</div>
            </div>
          ))}
        <table className="table-auto w-full rounded-md   ">
          {Children.map(children, (child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </table>
      </div>
      {paginacion}
    </div>
  )
}
