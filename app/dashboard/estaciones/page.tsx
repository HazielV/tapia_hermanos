import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";
import Lucide_Icon from "@/components/lucide_icono";
import Tabla from "@/components/tabla/Tabla";
import TablaHeader from "@/components/tabla/TablaHeader";
import TablaBody from "@/components/tabla/TablaBody";
import Link from "next/link";
import { getAll } from "@/app/actions/estaciones";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default async function ListaEstaciones({
  params,
}: {
  params: { pagina: string };
}) {
  const paginaActual = 1;
  const { datos, total } = await getAll(paginaActual);

  function filas(data: typeof datos extends (infer T)[] ? T : never) {
    return (
      <tr className="border-t border-gray-100 last:border-b dark:border-[#111315] hover:bg-gray-100/50 group hover:border-gray-100/50 text-xs  dark:bg-[#1A1D1F]">
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium ">
          {data.id}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.nombre}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.ubicacion}
        </td>

        <td className="px-4  first:border-none last:border-none  border-r dark:border-[#111315] border-l w-28">
          <TooltipProvider delayDuration={0}>
            <div className="flex gap-2 items-end ">
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/dashboard/estaciones" + "/edit/" + data.id}>
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
                  <div className="rounded-full border text-red-700  p-1.5 hover:bg-red-600 hover:text-gray-50">
                    <Lucide_Icon name="Trash2" size={15} />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-2 bg-black text-white"
                  align="start"
                >
                  <span className="text-xs ">Eliminar</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </td>
      </tr>
    );
  }
  return (
    <div className="p-4 md:p-8 pt-10 flex flex-col gap-5 flex-1 overflow-y-auto">
      <div className="flex w-full justify-between items-center flex-wrap gap-3">
        <h1 className="text-4xl font-medium  ">Estaciones</h1>
        <Link href={"/dashboard/estaciones/create"}>
          <Button className="flex gap-2 text-xs pl-2.5 capitalize py-2 h-auto bg-indigo-600 hover:bg-indigo-700 text-white">
            <Lucide_Icon name="Plus" size={18} />
            <span>nueva estacion</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl py-2 mt-5">
        <Tabla
          paginaActual={paginaActual}
          total={total}
          paginacion={true}
          ruta="estaciones/"
        >
          <TablaHeader
            columns={[
              { id: 1, descripcion: "id" },
              { id: 2, descripcion: "nombre" },
              { id: 3, descripcion: "ubicacion" },

              { id: 5, descripcion: "actions" },
            ]}
          >
            {(column) => (
              <th key={column.id} className="font-medium px-3 py-3">
                {column.descripcion}
              </th>
            )}
          </TablaHeader>
          <TablaBody filas={datos}>
            {(fila) => (
              <React.Fragment key={fila.id}>{filas(fila)}</React.Fragment>
            )}
          </TablaBody>
        </Tabla>
      </div>
    </div>
  );
}
