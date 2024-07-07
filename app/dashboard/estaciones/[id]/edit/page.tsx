import { edit, getEstacion, tipoEstaciones } from "@/app/actions/estaciones";

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

export default async function Edit({ params }: { params: { id: string } }) {
  const datos = await tipoEstaciones();
  const estacionId = params.id;
  const estacion = await getEstacion(Number(estacionId));
  const updateUserWithId = await edit.bind(null, Number(estacionId));
  return (
    <form
      action={updateUserWithId}
      className="w-fullh-[calc(100vh-68px)] flex-1  flex flex-col relative"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="mb-5 flex justify-between">
          <h1 className="text-4xl font-medium ">Nueva estacion</h1>
          <Link href={"/dashboard/estaciones"}>
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
        <div className="bg-white p-5 pb-6 rounded-xl grid md:grid-cols-2 gap-5">
          <h1 className="font-medium text-lg md:col-span-2">
            Datos de Estacion
          </h1>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              defaultValue={estacion?.nombre}
              required
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="ubicacion">Ubicacion</Label>
            <Input
              type="text"
              id="ubicacion"
              name="ubicacion"
              placeholder="Ubicacion"
              defaultValue={estacion?.ubicacion || ""}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="ubicacion">Tipo de Estacion</Label>
            <Select
              name="tipoEstacion"
              defaultValue={String(estacion?.tipo.id)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de Estacion" />
              </SelectTrigger>
              <SelectContent>
                {datos.map((tipoEstacion) => (
                  <SelectItem
                    key={tipoEstacion.id}
                    value={String(tipoEstacion.id)}
                  >
                    {tipoEstacion.descripcion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex sticky bottom-0 bg-white justify-end w-full md:col-span-2  text-sm px-4 py-4">
        <Button
          variant={"default"}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
