"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { placa } from "@prisma/client";
import { useState } from "react";

interface props {
  defaultValue?: number | undefined;
  defaultData?: placa[] | null | undefined;
}
export default function Placas({
  defaultValue = 0,
  defaultData = null,
}: props) {
  const [numero, setNumero] = useState(defaultValue);
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
              defaultValue={
                (defaultData && defaultData[indice]?.nroPlaca) || undefined
              }
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
