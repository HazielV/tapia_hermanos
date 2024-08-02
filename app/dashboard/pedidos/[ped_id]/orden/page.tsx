import {
  finalizarSeguimiento,
  getPedido,
  updateSeguimiento,
} from "@/app/actions/pedidos";
import Lucide_Icon from "@/components/lucide_icono";
import Tabla from "@/components/tabla/Tabla";
import TablaHeader from "@/components/tabla/TablaHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DialogSeg from "./DialogSeg";
export default async function page({ params }: { params: { ped_id: string } }) {
  const pedidoId = params.ped_id;
  const pedido = await getPedido(Number(pedidoId));
  const actual =
    pedido?.seguimiento.length === 0
      ? pedido?.ruta.parada.sort((a, b) => a.id - b.id)[0]
      : pedido?.ruta.parada.sort((a, b) => a.id - b.id)[
          pedido?.seguimiento.length
        ];

  const seguimiento = await updateSeguimiento.bind(null, Number(pedidoId));
  const finalizarseguimiento = await finalizarSeguimiento.bind(
    null,
    Number(pedidoId)
  );
  console.log(pedido?.estado);
  return (
    <div className="p-8 pt-10 flex flex-col gap-5 ">
      <div className="flex w-full justify-between items-center">
        <div className="text-4xl font-medium flex items-center justify-center gap-4">
          <span>Numero de orden:</span>
          <span className="text-xl font-normal mt-1.5">{pedido?.codigo}</span>
        </div>
        <Link href={"/dashboard/pedidos"} replace>
          <Button type="button" variant={"outline"} className=" text-sm pl-3 ">
            <Lucide_Icon name="ArrowLeft" size={22} />
            <span className="ml-3">Volver</span>
          </Button>
        </Link>
      </div>

      <div className="  grid grid-cols-1 gap-5 py-4">
        {/* tracking */}

        <div className="bg-white rounded-xl  grid grid-cols-2 md:grid-cols-4 p-5 text-base gap-4">
          <div className="col-span-2 md:col-span-4 text-lg font-medium">
            Detallas del pedido
          </div>
          <div>
            <h2 className=" text-sm text-gray-400/80 first-letter:uppercase">
              nombre de cliente
            </h2>
            <span className="text-base font-medium">
              {pedido?.nombre_cliente}
            </span>
          </div>

          <div>
            <h2 className=" text-sm text-gray-400/80 first-letter:uppercase">
              fecha pedido
            </h2>
            <span className="text-base font-medium">
              {new Date(pedido?.fecha_pedido as Date).toLocaleDateString(
                "es-ES",
                {
                  weekday: "short", // Día de la semana en texto
                  day: "numeric", // Día del mes en número
                  month: "short", // Mes en texto
                  year: "numeric", // Año en número
                }
              )}
            </span>
          </div>
          <div>
            <h2 className=" text-sm text-gray-400/80 first-letter:uppercase">
              fecha partida
            </h2>
            <span className="text-base font-medium">
              {new Date(pedido?.fecha_partida as Date).toLocaleDateString(
                "es-ES",
                {
                  weekday: "short", // Día de la semana en texto
                  day: "numeric", // Día del mes en número
                  month: "short", // Mes en texto
                  year: "numeric", // Año en número
                }
              )}
            </span>
          </div>
          <div>
            <h2 className="font-medium text-sm text-gray-400/80 first-letter:uppercase">
              fecha llegada
            </h2>
            <span className="text-base font-medium">
              {new Date(pedido?.fecha_entrega as Date).toLocaleDateString(
                "es-ES",
                {
                  weekday: "short", // Día de la semana en texto
                  day: "numeric", // Día del mes en número
                  month: "short", // Mes en texto
                  year: "numeric", // Año en número
                }
              )}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 grid gap-4">
          <div className=" text-lg font-medium ">Seguimiento</div>
          {/* paradas */}
          {/* <div className="grid gap-2">
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
          </div> */}
          <div className="grid grid-cols-3 gap-4">
            {pedido?.ruta.parada.map((parada, index) => (
              <div
                key={index}
                className="rounded-lg  p-3 flex flex-col min-h-20 justify-between outline outline-1 outline-gray-200 "
              >
                <div className="flex flex-col">
                  <h4 className="text-lg font-medium">
                    {parada.estacion.nombre}
                  </h4>
                  <h2>
                    {pedido.seguimiento.find(
                      (seg) => seg.parada_id === parada.id
                    )?.fecha
                      ? new Date(
                          pedido.seguimiento.find(
                            (seg) => seg.parada_id === parada.id
                          )?.fecha as Date
                        ).toLocaleDateString("es-ES", {
                          weekday: "short", // Día de la semana en texto
                          day: "numeric", // Día del mes en número
                          month: "short", // Mes en texto
                          year: "numeric", // Año en número
                        })
                      : "no llego"}
                  </h2>
                </div>
                <div className="justify-self-end self-end">
                  {pedido?.seguimiento.length === 0 ? (
                    <div className="text-yellow-600 bg-yellow-600/5 rounded-full p-1.5 px-3.5 text-sm capitalize cursor-default">
                      En espera
                    </div>
                  ) : pedido.seguimiento.find(
                      (auxP) => auxP.parada_id === parada.id
                    ) ? (
                    <div className="text-emerald-600 bg-emerald-600/10 rounded-full p-1.5 px-3.5 text-sm capitalize cursor-default">
                      completado
                    </div>
                  ) : (
                    <div className="text-blue-600 bg-blue-600/10  rounded-full p-1.5 px-3.5 text-sm capitalize cursor-default">
                      en camino
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {pedido?.estado &&
            pedido?.estado < 4 &&
            (pedido?.seguimiento.length === pedido?.ruta.parada.length ? (
              <DialogSeg
                titulo="Finalizar Pedido"
                action={finalizarseguimiento}
                btnText="Finalizar"
                btnForm="Finalizar"
              >
                <div className="grid w-full items-center gap-1.5 ">
                  <Label htmlFor="fecha">Fecha de Llegada</Label>
                  <Input type="date" id="fecha" name="fechaLlegada" required />
                </div>
              </DialogSeg>
            ) : (
              <DialogSeg
                titulo="Actualizar pedido"
                action={seguimiento}
                btnText="Actualizar parada"
                btnForm="Actualizar parada"
              >
                <div className="grid w-full items-center gap-1.5 ">
                  <Label htmlFor="fecha">Fecha en estacion</Label>
                  <Input type="date" id="fecha" name="fecha" required />
                  <input
                    type="number"
                    value={actual?.id}
                    name="parada_id"
                    hidden
                    readOnly
                  />
                </div>
              </DialogSeg>
            ))}
        </div>
      </div>
    </div>
  );
}
