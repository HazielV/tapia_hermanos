import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { getAllEstacionesActivas } from "../actions/estaciones";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { create } from "../actions/cotizacion";

export default async function Cotizacion() {
  const estaciones = await getAllEstacionesActivas();
  return (
    <div className="h-screen flex flex-col w-screen pt-20 ">
      <div className="fixed w-full z-50 bg-gray-100 p-4 flex items-center justify-between py-2 top-0">
        {/* logo */}
        <div className="h-16 flex">
          <img src="/logo.png" alt="" />
        </div>
        {/* barras */}
        <div className="cursor-pointer sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>
        {/* MENUS */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-6 gap-8 font-medium">
            <div className="cursor-pointer ">
              <a href="#Inicio">Inicio</a>
            </div>
            <div className="cursor-pointer">
              <a href="#Nosotros">Nosotros</a>
            </div>
            <div className="cursor-pointer">
              <a href="#Servicios">Servicios</a>
            </div>
            <div className="cursor-pointer">
              <a href="#Cotizacion">Cotizacion</a>
            </div>
            <div className="cursor-pointer">
              <a href="#Destinos">Destinos</a>
            </div>
            <div className="cursor-pointer">
              <a href="#Contacto">Contacto</a>
            </div>
          </div>
        </div>
      </div>
      <form
        className="w-full flex-1 h-full  flex flex-col relative  "
        action={create}
      >
        <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
          <div className="mb-5 flex justify-between">
            <h1 className="text-4xl font-medium ">Cotizacion en linea</h1>
            <div className="flex justify-end">
              <Button
                variant={"default"}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Enviar cotizacion
              </Button>
            </div>
          </div>
          <div className="bg-white p-5 pb-2 rounded-xl grid md:grid-cols-3 gap-5">
            <h1 className="font-medium text-lg md:col-span-2">Datos Persona</h1>

            <div className="grid w-full items-center gap-1.5 md:col-span-3">
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
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input
                type="email"
                id="correo"
                name="correo"
                placeholder="Nro documento"
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="telefono">Teléfono </Label>
              <Input
                type="number"
                id="telefono"
                name="telefono"
                placeholder="Telefono"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="movil">Teléfono móvil </Label>
              <Input
                type="number"
                id="movil"
                name="movil"
                placeholder="Teléfono móvil"
              />
            </div>
          </div>
          <div className="bg-white p-5 pb-6 rounded-xl grid md:grid-cols-3 gap-5">
            <h1 className="font-medium text-lg col-span-3">Datos solicitud</h1>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="origen">Ciudad de origen</Label>
              <Select name="origen" required>
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
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="destino">Ciudad de destino</Label>

              <Select name="destino" required>
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
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="formaPago">Forma de pago</Label>

              <Select name="formaPago">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione una forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5 col-start-1 col-end-2">
              <Label htmlFor="tipo">Tipo de mercancia</Label>
              <Input
                type="text"
                id="tipo"
                name="tipo"
                placeholder="Tipo de mercancia"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 col-start-2 col-end-3">
              <Label htmlFor="valor">Valor de carga</Label>
              <Input
                type="destino"
                name="valor"
                id="valor"
                placeholder="Valor de factura o nota comercial "
              />
            </div>
          </div>
          <div className="bg-white p-5 pb-6 pt-0 rounded-xl grid md:grid-cols-5 gap-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="volumenes">Volúmenes</Label>
              <Input
                type="number"
                id="volumenes"
                name="volumenes"
                placeholder="Volúmenes"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="altura">Altura total (mt)</Label>
              <Input
                type="number"
                name="altura"
                id="altura"
                placeholder="Altura total"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="longitud">Longitud (mt)</Label>
              <Input
                type="number"
                name="longitud"
                id="longitud"
                placeholder="Longitud"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="ancho">Ancho (mt)</Label>
              <Input
                type="number"
                name="ancho"
                id="ancho"
                placeholder="Ancho"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="peso">Peso total (Tn):</Label>
              <Input
                type="number"
                name="peso"
                id="peso"
                placeholder="Peso total"
              />
            </div>
            <div className="grid w-full items-center md:col-span-5">
              <Label htmlFor="comentario">Comentarios:</Label>
              <Textarea className="mt-2" name="comentario" id="comentario" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
