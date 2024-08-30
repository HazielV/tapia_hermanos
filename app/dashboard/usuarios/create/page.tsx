import { create } from "@/app/actions/users";
import FormButton from "@/components/FormButton";
import Lucide_Icon from "@/components/lucide_icono";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Create() {
  return (
    <form
      action={create}
      className="flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="mb-5 flex justify-between">
          <h1 className="text-4xl font-medium ">Nuevo usuario</h1>
          <Link href={"/dashboard/usuarios"}>
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
          <h1 className="font-medium text-lg md:col-span-2">Datos Persona</h1>
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
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nroDocumento">Nro documento</Label>
            <Input
              type="number"
              id="nroDocumento"
              name="nroDocumento"
              placeholder="Nro documento"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="primerApellido">Primer Apellido</Label>
            <Input
              type="text"
              id="primerApellido"
              name="primerApellido"
              placeholder="Primer Apellido"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="segundoApellido">Segundo Apellido</Label>
            <Input
              type="text"
              id="segundoApellido"
              name="segundoApellido"
              placeholder="Segundo Apellido"
              required
            />
          </div>
        </div>
        <div className="bg-white p-5 pb-6 rounded-xl grid md:grid-cols-2 gap-5">
          <h1 className="font-medium text-lg md:col-span-2">Datos Usuario</h1>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="usuario">Usuario</Label>
            <Input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="Contraseña"
              required
            />
          </div>
        </div>
      </div>
      <FormButton />
    </form>
  );
}
