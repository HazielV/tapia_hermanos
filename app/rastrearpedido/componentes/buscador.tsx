"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Buscador() {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  return (
    <div className="grid w-full items-center gap-1.5 max-w-sm">
      <h1 className="text-3xl mb-8 text-center">Seguimiendo de carga</h1>
      <Label htmlFor="codigo">Codigo de pedido</Label>
      <Input
        id="codigo"
        name="codigo"
        placeholder="Escriba el codigo de rastreo"
        required
        value={codigo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCodigo(event.target.value)
        }
      />
      <div className="self-end justify-self-end">
        <Button
          onClick={() => {
            router.push("/rastrearpedido/" + codigo);
          }}
          variant={"secondary"}
          className=""
        >
          Buscar
        </Button>
      </div>
    </div>
  );
}
