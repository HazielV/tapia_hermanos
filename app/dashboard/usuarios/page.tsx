import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";
import Lucide_Icon from "@/components/lucide_icono";
import Tabla from "@/components/tabla/Tabla";
import TablaHeader from "@/components/tabla/TablaHeader";
import TablaBody from "@/components/tabla/TablaBody";
import Link from "next/link";
import { deshabilitar, getAll, habilitar } from "@/app/actions/users";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Eliminar from "@/components/Eliminar";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default async function ListaUsuarios({
  params,
}: {
  params: { pagina: string };
}) {
  const perPage = 2;
  const paginaActual = 1;
  const { usuarios, total } = await getAll(paginaActual);

  function filas(data: typeof usuarios extends (infer T)[] ? T : never) {
    return (
      <tr className="border-t border-gray-100 last:border-b dark:border-[#111315] hover:bg-gray-100/50 group hover:border-gray-100/50 text-xs  dark:bg-[#1A1D1F]">
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium ">
          {data.login}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.persona.nombre}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.persona.primerApellido}
        </td>

        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.persona.segundoApellido}
        </td>

        <td className="px-4  first:border-none last:border-none  border-r dark:border-[#111315] border-l w-28">
          <TooltipProvider delayDuration={0}>
            <div className="flex gap-2 items-end ">
              {data.estado === 1 && (
                <>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={"/dashboard/usuarios" + "/edit/" + data.id}>
                        <div className="rounded-full border text-emerald-700 p-1.5 hover:bg-emerald-600 hover:text-gray-50">
                          <Lucide_Icon name="Pencil" size={15} />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      className="py-1 px-2 bg-black text-white"
                      align="start"
                    >
                      <span className="text-xs ">Editar</span>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <Eliminar
                        action={deshabilitar}
                        titulo="Seguro que desea inhabilitar el usuario"
                        btnText={
                          <div className="rounded-full border text-red-700  p-1.5 hover:bg-red-600 hover:text-gray-50">
                            <Lucide_Icon name="Trash2" size={15} />
                          </div>
                        }
                      >
                        <input
                          type="number"
                          hidden
                          value={data.id}
                          readOnly
                          name="id"
                        />
                      </Eliminar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="py-1 px-2 bg-black text-white"
                      align="start"
                    >
                      <span className="text-xs ">Deshabilitar</span>
                    </TooltipContent>
                  </Tooltip>
                </>
              )}
              {data.estado === 2 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Eliminar
                      action={habilitar}
                      titulo="Seguro que desea inhabilitar el usuario"
                      btnText={
                        <div className="rounded-full border text-green-700  p-1.5 hover:bg-green-600 hover:text-gray-50">
                          <Lucide_Icon name="RefreshCcw" size={15} />
                        </div>
                      }
                    >
                      <input
                        type="number"
                        hidden
                        value={data.id}
                        readOnly
                        name="id"
                      />
                    </Eliminar>
                  </TooltipTrigger>
                  <TooltipContent
                    className="py-1 px-2 bg-black text-white"
                    align="start"
                  >
                    <span className="text-xs ">Habilitar</span>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        </td>
      </tr>
    );
  }
  return (
    <div className="p-4 md:p-8 pt-10 flex-1 flex flex-col gap-5 overflow-y-auto">
      <div className="flex w-full justify-between items-center flex-wrap gap-3">
        <h1 className="text-4xl font-medium  ">Usuarios</h1>
        <Link href={"/dashboard/usuarios/create"}>
          <Button className="flex gap-2 text-xs pl-2.5 capitalize py-2 h-auto bg-indigo-600 hover:bg-indigo-700 text-white">
            <Lucide_Icon name="Plus" size={18} />
            <span>nuevo usuario</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl py-2 mt-5">
        <Tabla
          paginaActual={paginaActual}
          total={total}
          paginacion={true}
          ruta="usuarios/"
        >
          <TablaHeader
            columns={[
              { id: 1, descripcion: "login" },
              { id: 2, descripcion: "nombre" },
              { id: 3, descripcion: "paterno" },
              { id: 4, descripcion: "materno" },
              { id: 5, descripcion: "actions" },
            ]}
          >
            {(column) => (
              <th key={column.id} className="font-medium px-3 py-3">
                {column.descripcion}
              </th>
            )}
          </TablaHeader>
          <TablaBody filas={usuarios}>
            {(fila) => (
              <React.Fragment key={fila.id}>{filas(fila)}</React.Fragment>
            )}
          </TablaBody>
        </Tabla>
      </div>
    </div>
  );
}
