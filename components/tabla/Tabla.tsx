import React, { Children } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface props {
  children: JSX.Element | JSX.Element[];
  paginacion?: boolean;
  titulo?: string;
  valor_buscardor?: string;
  buscador?: boolean;
  Btn?: JSX.Element;
  funcion_buscador?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paginaActual?: number;
  total?: number;
  perPage?: number;
  ruta?: string;
}
export default function Tabla({
  children,
  paginacion = false,
  titulo,
  buscador,
  valor_buscardor,
  Btn,
  funcion_buscador,
  paginaActual,
  total,
  perPage = 10,
  ruta,
}: props) {
  return (
    <div className="p-2 dark:bg-[#111315] m-2 rounded-md ">
      {titulo && (
        <div
          className={
            "text-sm font-medium first-letter:uppercase relative mb-2 "
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
                "flex " + (buscador ? " justify-between" : " justify-end")
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
      {paginacion &&
        paginaActual &&
        total &&
        perPage &&
        ruta &&
        ruta?.length > 0 && (
          <Pagination className="mt-2">
            <PaginationContent>
              {/* anterior */}
              <PaginationItem>
                {/* {paginaActual === 1 ? (
                  <Button variant={"outline"} disabled>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="ml-1">Anterior</span>
                  </Button>
                ) : (
                  <PaginationPrevious
                    href={"/dashboard/" + ruta + (paginaActual - 1)}
                  />
                )} */}
                {}
                <PaginationPrevious
                  href={
                    "/dashboard/" +
                    ruta +
                    (paginaActual === 1 ? 1 : paginaActual - 1)
                  }
                />
              </PaginationItem>
              {/* paginas */}
              {Array.from(
                { length: Math.ceil(total / perPage) },
                (_, i) => i + 1
              ).map((pag, index) => (
                <PaginationItem
                  key={index}
                  className={
                    paginaActual === pag ? " bg-slate-100 rounded-md " : ""
                  }
                >
                  <PaginationLink href={"/dashboard/" + ruta + pag}>
                    {pag}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* 
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
              {/* siguiente */}
              <PaginationItem>
                {/* {paginaActual * perPage >= total ? (
                  <Button variant={"outline"} disabled>
                    <span className="ml-1">Siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <PaginationNext
                    href={"/dashboard/" + ruta + (paginaActual + 1)}
                  />
                )} */}
                <PaginationNext
                  href={
                    "/dashboard/" +
                    ruta +
                    (paginaActual * perPage >= total
                      ? paginaActual
                      : paginaActual + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
    </div>
  );
}
/* <React.Fragment key={index}>
                    {paginaActual === pag ? (
                      <Button variant={"secondary"}>{pag}</Button>
                    ) : (
                      <PaginationItem
                        key={index}
                        className={
                          paginaActual === pag
                            ? " bg-slate-100 rounded-md "
                            : ""
                        }
                      >
                        <PaginationLink href={"/dashboard/" + ruta + pag}>
                          {pag}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </React.Fragment> */
