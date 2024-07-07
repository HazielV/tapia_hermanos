import { edit, getUser } from "@/app/actions/users";
import Lucide_Icon from "@/components/lucide_icono";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default async function Edit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await getUser(Number(userId));
  const updateUserWithId = await edit.bind(null, Number(userId));
  return (
    <form
      action={updateUserWithId}
      className="w-fullh-[calc(100vh-68px)] flex-1  flex flex-col relative"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="mb-5 flex justify-between">
          <h1 className="text-4xl font-medium ">Editar usuario</h1>
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
              defaultValue={user?.persona.nombre}
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
              defaultValue={user?.persona.nroDocumento}
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
              defaultValue={user?.persona.primerApellido}
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
              defaultValue={user?.persona.segundoApellido}
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
              defaultValue={user?.login}
            />
          </div>
        </div>
      </div>
      <div className="flex sticky bottom-0 bg-white justify-end w-full md:col-span-2  text-sm px-4 py-4">
        <Button
          variant={"default"}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Editar Usuario
        </Button>
      </div>
    </form>
  );
}
