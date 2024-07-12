import { getPedido, updateSeguimiento } from "@/app/actions/pedidos";
import Lucide_Icon from "@/components/lucide_icono";
import Tabla from "@/components/tabla/Tabla";
import TablaHeader from "@/components/tabla/TablaHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { ped_id: string } }) {
  const pedidoId = params.ped_id;
  const pedido = await getPedido(Number(pedidoId));
  const ultimo = pedido?.seguimiento.sort(
    (a, b) => b.parada_id - a.parada_id
  )[0];
  const seguimiento = await updateSeguimiento.bind(null, Number(pedidoId));
  console.log(ultimo);
  return (
    <div className="p-8 pt-10 flex flex-col gap-5 ">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl font-medium flex items-center gap-4">
          Numero de orden:
          <span className="text-2xl font-normal">{pedido?.codigo}</span>
        </h1>
        <Link href={"/dashboard/pedidos"} replace>
          <Button type="button" variant={"outline"} className=" text-sm pl-3 ">
            <Lucide_Icon name="ArrowLeft" size={22} />
            <span className="ml-3">Volver</span>
          </Button>
        </Link>
      </div>

      <div className="  grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* tracking */}
        <div className="bg-white rounded-xl  mt-5 p-5 grid gap-4">
          <div className="flex  justify-between">
            <h1 className="text-xl font-medium flex items-center gap-4">
              Seguimiento :
            </h1>
          </div>
          {/* paradas */}
          <div className="grid gap-2">
            {pedido?.ruta.parada.map((parada, index) => (
              <div key={index} className="rounded-md bg-gray-50 p-3">
                <h4 className="text-lg font-medium mb-3">
                  {parada.estacion.nombre}
                </h4>

                {pedido.seguimiento.find(
                  (auxP) => auxP.parada_id === parada.id
                ) &&
                  ultimo?.parada_id === parada.id && (
                    <button className="bg-blue-600 text-white rounded-md p-2 text-sm capitalize">
                      en camino ...
                    </button>
                  )}
                {pedido.seguimiento.find(
                  (auxP) => auxP.parada_id === parada.id
                ) &&
                  ultimo?.parada_id !== parada.id && (
                    <button className="bg-emerald-600 text-white rounded-md p-2 text-sm capitalize">
                      completado
                    </button>
                  )}

                {!pedido.seguimiento.find(
                  (auxP) => auxP.parada_id === parada.id
                ) && (
                  <form action={seguimiento}>
                    <input
                      type="number"
                      value={parada.id}
                      name="parada_id"
                      hidden
                    />
                    <button
                      type="submit"
                      className="bg-gray-800 text-white rounded-md p-2 text-sm capitalize"
                    >
                      cambiar
                    </button>
                  </form>
                )}
              </div>
            ))}
            {pedido?.seguimiento.length === pedido?.ruta.parada.length && (
              <form action="" className="px-2 self-end justify-self-end">
                <Button
                  type="submit"
                  variant={"outline"}
                  className="capitalize"
                >
                  finalizar
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl py-2 mt-5 md:col-span-2">
          <Tabla>
            <TablaHeader
              columns={[
                { id: 2, descripcion: "nombre de cliente" },
                { id: 3, descripcion: "fecha llegada" },
                { id: 4, descripcion: "Numero Orden" },
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
            {/* {datos.length !== 0 ? (
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
          )} */}
          </Tabla>
        </div>
      </div>
    </div>
  );
}
