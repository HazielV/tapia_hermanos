import { getAllEstacionesActivas } from "@/app/actions/estaciones";
import Lucide_Icon from "@/components/lucide_icono";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

import Paradas from "./paradas";
import { create } from "@/app/actions/rutas";
import FormButton from "@/components/FormButton";

export default async function Create() {
  const estaciones = await getAllEstacionesActivas();
  return (
    <form
      action={create}
      className="flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="mb-5 flex justify-between">
          <h1 className="text-4xl font-medium ">Nueva ruta</h1>
          <Link href={"/dashboard/rutas"}>
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
          <h1 className="font-medium text-lg md:col-span-2">Ruta</h1>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              required
            />
          </div>
          <Paradas estaciones={estaciones} defaultEstaciones={[]} />
        </div>
      </div>
      <FormButton />
    </form>
  );
}
