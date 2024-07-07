"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Placas() {
  const [numero, setNumero] = useState(0);
  return (
    <>
      <div className="grid w-full items-center gap-1.5 ">
        <Label htmlFor="nroPlacas">Nro. de Placas</Label>
        <Input
          type="number"
          id="nroPlacas"
          name="nroPlacas"
          placeholder="Nro. Placas"
          value={numero}
          onChange={(e) => setNumero(Number(e.target.value))}
          required
        />
      </div>
      <h1 className="font-medium text-lg md:col-span-3">Numero de placas</h1>
      {numero > 0 ? (
        Array.from({ length: numero }, (_, indice) => (
          <div key={indice} className="grid w-full items-center gap-1.5 ">
            <Label htmlFor={`placa${indice + 1}`}>{`Placa ${
              indice + 1
            }`}</Label>
            <Input
              id={`placa${indice + 1}`}
              name="placas[]"
              type="text"
              placeholder={`Numero de Placa ${indice + 1}`}
              required
            />
          </div>
        ))
      ) : (
        <div className="grid w-full items-center gap-1.5 text-sm ">
          seleccione un numero de placas
        </div>
      )}
    </>
  );
}
