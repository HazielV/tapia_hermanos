import { rastrearPedido } from "@/app/actions/pedidos";
import Lucide_Icon from "@/components/lucide_icono";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const pedidoCodigo = params.id;
  const pedido = await rastrearPedido(pedidoCodigo);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="fixed w-full z-50 bg-gray-100/70 p-4 flex items-center justify-between py-2 top-0">
        {/* logo */}
        <div className="h-16 flex">
          <img src="/logo.png" alt="" />
        </div>

        {/* MENUS */}
        <div className="">
          <div className="grid  gap-8 font-medium">
            <Link href={"/"} className="flex">
              <div className="cursor-pointer ">Inicio</div>
            </Link>
          </div>
        </div>
      </div>
      {/* buscador */}
      {pedido ? (
        <div className="rounded-md  w-full md:max-w-2xl shadow-md m-5 flex flex-col ">
          <div>Codigo: {pedidoCodigo}</div>
          <div className="border-b p-10 first-letter:uppercase font-medium text-sm flex items-center gap-10">
            <span className="text-emerald-600">
              <Lucide_Icon name="CircleCheck" size={40} />
            </span>
            <h1 className="text-lg">
              !Excelente!, el pago fue confirmado, estamos trabajando en el
              envio
            </h1>
          </div>
          <div className="border-b p-10 first-letter:uppercase font-medium text-lg flex items-center gap-10">
            <span className="text-indigo-600">
              <Lucide_Icon name="Calendar" size={40} />
            </span>
            <p>
              fecha de entrega estimada:{" "}
              {new Date(pedido.fecha_entrega).toLocaleDateString("es-ES", {
                weekday: "short", // Día de la semana en texto
                day: "numeric", // Día del mes en número
                month: "short", // Mes en texto
                year: "numeric", // Año en número
              })}
            </p>
          </div>
          <div className="p-10">
            <div className="px-10 border-l-2 border-gray-500  w-full max-w-md grid gap-5 relative">
              {pedido.ruta.parada.map((parada) => (
                <div key={parada.id}>
                  {pedido.seguimiento.find((seg) => seg.parada_id === parada.id)
                    ?.fecha ? (
                    <span className="absolute -left-[13px] bg-white">
                      <Lucide_Icon name="CircleCheck" />
                    </span>
                  ) : (
                    <span className="absolute -left-[13px] bg-white text-gray-200">
                      <Lucide_Icon name="Circle" />
                    </span>
                  )}
                  <div className="flex justify-between items-center">
                    <h1 className="text-base font-medium">
                      {parada.estacion.nombre}
                    </h1>
                    <span className="text-sm text-gray-500 flex gap-2">
                      <Lucide_Icon name="Calendar" size={20} />
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
                        : "Sin fecha de llegada"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>no hay pedidos con el codigo: {pedidoCodigo}</div>
      )}
    </div>
  );
}
