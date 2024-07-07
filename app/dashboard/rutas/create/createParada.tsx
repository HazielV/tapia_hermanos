"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { estacion, parada } from "@prisma/client";
import { useState } from "react";
export default function CreateParada({
  estaciones,
  cerrar,
  adicionar,
}: {
  estaciones: estacion[];
  cerrar: () => void;
  adicionar: (p: estacion) => void;
}) {
  const [value, setValue] = useState("1");

  const guardar = () => {
    const elegido = estaciones.find((elem) => elem.id === Number(value));
    if (elegido) adicionar(elegido);
    cerrar();
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white pt-5 rounded-xl grid gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="ubicacion">Seleccione una Estacion</Label>
          <Select
            value={value}
            onValueChange={setValue}
            name="tipoEstacion"
            defaultValue="1"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione una Estacion" />
            </SelectTrigger>
            <SelectContent>
              {estaciones.map((estacion) => (
                <SelectItem key={estacion.id} value={String(estacion.id)}>
                  {estacion.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={guardar}
          className="flex gap-2  items-center justify-center bg-indigo-600"
        >
          <span className="capitalize">Guardar</span>
        </Button>
      </div>
    </div>
  );
}
