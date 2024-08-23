import { create, edit, getPedido } from "@/app/actions/pedidos";
import { getAllActivas } from "@/app/actions/rutas";
import Lucide_Icon from "@/components/lucide_icono";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React from "react";
import Placas from "../../create/placas";
import FormButton from "@/components/FormButton";

export default async function page({ params }: { params: { ped_id: string } }) {
  const pedidoId = params.ped_id;
  const pedido = await getPedido(Number(pedidoId));
  const editaPedido = await edit.bind(null, Number(pedidoId));
  const rutasActivas = await getAllActivas();
  return (
    <form
      action={editaPedido}
      className="w-full flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="mb-5 flex justify-between">
          <h1 className="text-4xl font-medium ">Editar Pedido</h1>
          <Link href={"/dashboard/pedidos"} replace>
            <Button
              type="button"
              variant={"outline"}
              className=" text-sm pl-3 "
            >
              <Lucide_Icon name="ArrowLeft" size={22} />
              <span className="ml-3">Volver</span>
            </Button>
          </Link>
        </div>
        <div className="bg-white p-5 pb-6 rounded-xl grid md:grid-cols-3 gap-5">
          <h1 className="font-medium text-lg md:col-span-3">
            Datos del cliente
          </h1>
          <div className="grid w-full items-center gap-1.5 md:col-span-2">
            <Label htmlFor="nombre">Nombre del cliente</Label>
            <Input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              required
              defaultValue={pedido?.nombre_cliente}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="correo">Correo</Label>
            <Input
              type="email"
              id="correo"
              name="correo"
              placeholder="Correo"
              required
              defaultValue={pedido?.correo}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              type="number"
              id="telefono"
              name="telefono"
              placeholder="Telefono"
              required
              defaultValue={pedido?.telefono || 0}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fPartida">Fecha partida</Label>
            <Input
              type="date"
              id="fPartida"
              name="fPartida"
              placeholder="Fecha partida"
              required
              defaultValue={pedido?.fecha_partida.toISOString().split("T")[0]}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fEntrega">Fecha entrega</Label>
            <Input
              type="date"
              id="fEntrega"
              name="fEntrega"
              placeholder="Fecha entrega"
              required
              defaultValue={pedido?.fecha_entrega.toISOString().split("T")[0]}
            />
          </div>
          <h1 className="font-medium text-lg md:col-span-3">
            Datos del pedido
          </h1>
          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="precio">Precio (bs)</Label>
            <Input
              type="number"
              id="precio"
              name="precio"
              placeholder="Precio"
              required
              defaultValue={pedido?.precio || 0}
            />
          </div>

          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="tipo">Tipo de carga</Label>
            <Input
              type="text"
              id="tipo"
              name="tipo"
              placeholder="Tipo de carga"
              required
              defaultValue={pedido?.tipo || ""}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="altura">Altura</Label>
            <Input
              type="number"
              id="altura"
              name="altura"
              placeholder="Altura"
              defaultValue={pedido?.altura || undefined}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="longitud">Longitud</Label>
            <Input
              type="number"
              id="longitud"
              name="longitud"
              placeholder="Longitud"
              defaultValue={pedido?.longitud || undefined}
            />
          </div>
          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="ancho">Ancho</Label>
            <Input
              type="text"
              id="ancho"
              name="ancho"
              placeholder="Ancho"
              defaultValue={pedido?.ancho || undefined}
            />
          </div>

          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="formaPago">Forma de pago</Label>
            <Input
              type="text"
              id="formaPago"
              name="formaPago"
              placeholder="Forma de pago"
              required
              defaultValue={pedido?.formaPago || undefined}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="ruta">Ruta</Label>
            <Select name="ruta" defaultValue={String(pedido?.ruta.id)} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de Estacion" />
              </SelectTrigger>
              <SelectContent>
                {rutasActivas.map((ruta) => (
                  <SelectItem key={ruta.id} value={String(ruta.id)}>
                    {ruta.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <h1 className="font-medium text-lg md:col-span-3">Cargamento</h1>
          <div className="grid w-full items-center gap-1.5 ">
            <Label htmlFor="peso">Peso</Label>
            <Input
              type="number"
              id="peso"
              name="peso"
              placeholder="Peso (Tn)"
              required
              defaultValue={pedido?.peso || undefined}
            />
          </div>
          <Placas
            defaultValue={pedido?.placas.length}
            defaultData={pedido?.placas}
          />
        </div>
      </div>
      <FormButton />
    </form>
  );
}
