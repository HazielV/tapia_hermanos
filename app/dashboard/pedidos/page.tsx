import { entregarPedido, getAll } from "@/app/actions/pedidos";
import Lucide_Icon from "@/components/lucide_icono";
import Tabla from "@/components/tabla/Tabla";
import TablaBody from "@/components/tabla/TablaBody";
import TablaHeader from "@/components/tabla/TablaHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog } from "@radix-ui/react-dialog";
import Link from "next/link";
import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DialogSeg from "./orden/[ped_id]/DialogSeg";

export default async function Pedidos() {
  const paginaActual = 1;
  const { datos, total } = await getAll(paginaActual);

  function filas(data: typeof datos extends (infer T)[] ? T : never) {
    return (
      <tr className="border-t border-gray-100 last:border-b dark:border-[#111315] hover:bg-gray-100/50 group hover:border-gray-100/50 text-xs  dark:bg-[#1A1D1F]">
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.nombre_cliente}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.codigo}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {new Date(data.fecha_entrega).toLocaleDateString("es-ES", {
            weekday: "long", // Día de la semana en texto
            day: "numeric", // Día del mes en número
            month: "long", // Mes en texto
            year: "numeric", // Año en número
          })}
        </td>

        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {new Date(data.fecha_pedido).toLocaleDateString("es-ES", {
            weekday: "long", // Día de la semana en texto
            day: "numeric", // Día del mes en número
            month: "long", // Mes en texto
            year: "numeric", // Año en número
          })}
        </td>
        <td className="px-4 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium">
          {data.ruta.nombre}
        </td>
        <td className="px-2 py-4 first:border-none last:border-none  border-r dark:border-[#111315] border-l font-medium w-auto ">
          {data.estado === 3 && (
            <span className="rounded-full px-2 py-1 bg-yellow-500/5 whitespace-nowrap capitalize text-yellow-600">
              en proceso
            </span>
          )}
          {data.estado === 4 && (
            <span className="rounded-full px-2 py-1 bg-emerald-700/5 whitespace-nowrap capitalize text-emerald-700">
              en almacen
            </span>
          )}
          {data.estado === 5 && (
            <span className="rounded-full px-2 py-1 bg-indigo-50/90 whitespace-nowrap capitalize text-indigo-600">
              entregado
            </span>
          )}
        </td>
        <td className="px-4  first:border-none last:border-none  border-r dark:border-[#111315] border-l w-28">
          <TooltipProvider delayDuration={0}>
            <div className="flex gap-2 items-end justify-end ">
              {data.estado === 4 && (
                <Tooltip>
                  <TooltipTrigger>
                    {/* <Link href={"pedidos/" + data.id + "/orden"}>
                      <div className="rounded-full border text-emerald-700 p-1.5 hover:bg-emerald-600 hover:text-gray-50">
                        <Lucide_Icon name="Check" size={15} />
                      </div>
                    </Link> */}
                    <DialogSeg
                      action={entregarPedido}
                      titulo="Entregar Pedido"
                      btnForm="entregar"
                      btnText={
                        <div className="rounded-full border text-emerald-700 p-1.5 hover:bg-emerald-600 hover:text-gray-50">
                          <Lucide_Icon name="Check" size={15} />
                        </div>
                      }
                    >
                      <div className="grid w-full items-center gap-1.5 ">
                        <Label htmlFor="fecha">Fecha de Llegada</Label>
                        <Input
                          type="date"
                          id="fecha"
                          name="fechaLlegada"
                          required
                        />
                        <input
                          type="number"
                          value={data?.id}
                          name="pedido_id"
                          hidden
                          readOnly
                        />
                      </div>
                    </DialogSeg>
                  </TooltipTrigger>
                  <TooltipContent
                    className="py-1 px-2 bg-black text-white"
                    align="start"
                  >
                    <span className="text-xs ">Entregar</span>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/dashboard/pedidos/" + "orden/" + data.id}>
                    <div className="rounded-full border text-blue-700 p-1.5 hover:bg-blue-600 hover:text-gray-50">
                      <Lucide_Icon name="Eye" size={15} />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="py-1 px-2 bg-black text-white"
                  align="start"
                >
                  <span className="text-xs ">Ver</span>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={"/dashboard/pedidos" + "/edit/" + data.id}>
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
              {data.seguimiento.length === 0 && (
                <Tooltip>
                  <TooltipTrigger>
                    <div className="rounded-full border text-red-700  p-1.5 hover:bg-red-600 hover:text-gray-50">
                      <Lucide_Icon name="Ban" size={15} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="py-1 px-2 bg-black text-white"
                    align="start"
                  >
                    <span className="text-xs ">Cancelar</span>
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
    <div className="p-4 md:p-8 pt-10 flex flex-col gap-5 flex-1 overflow-y-auto">
      <div className="flex w-full justify-between items-center flex-wrap gap-3">
        <h1 className="text-4xl font-medium  ">Pedidos</h1>
        <Link href={"/dashboard/pedidos/create"}>
          <Button className="flex gap-2 text-xs pl-2.5 capitalize py-2 h-auto bg-indigo-600 hover:bg-indigo-700 text-white">
            <Lucide_Icon name="Plus" size={18} />
            <span>nuevo pedido</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl py-2 mt-5">
        <Tabla
          paginaActual={paginaActual}
          total={total}
          paginacion={true}
          ruta="pedidos/"
        >
          <TablaHeader
            columns={[
              { id: 2, descripcion: "nombre de cliente" },
              { id: 4, descripcion: "Numero Orden" },
              { id: 3, descripcion: "fecha llegada" },
              { id: 5, descripcion: "fecha pedido" },
              { id: 6, descripcion: "ruta" },

              { id: 7, descripcion: "estado" },
              { id: 8, descripcion: "actions" },
            ]}
          >
            {(column) => (
              <th key={column.id} className="font-medium px-3 py-3">
                {column.descripcion}
              </th>
            )}
          </TablaHeader>
          {datos.length !== 0 ? (
            <TablaBody filas={datos}>
              {(fila) => (
                <React.Fragment key={fila.id}>{filas(fila)}</React.Fragment>
              )}
            </TablaBody>
          ) : (
            <tbody>
              <tr>
                <td>
                  <div className="text-xs">No existen registros</div>
                </td>
              </tr>
            </tbody>
          )}
        </Tabla>
      </div>
    </div>
  );
}
