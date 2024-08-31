"use client";

import Lucide_Icon from "@/components/lucide_icono";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  function abrir() {
    setOpen(true);
  }
  function cerrar() {
    setOpen(false);
  }
  function toggle() {
    setOpen((prev) => !prev);
  }
  return (
    <div>
      <div className="cursor-pointer sm:hidden" onClick={toggle}>
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
      {/* ventana flotante */}
      {open && (
        <div className="inset-0 fixed bg-black/80 top-0 left-0 sm:hidden">
          <div
            className="absolute right-3 top-3 text-white cursor-pointer"
            onClick={cerrar}
          >
            <Lucide_Icon name="X" size={40} />
          </div>
          <div className="grid gap-10  text-gray-100 place-content-center place-items-center items-center h-full capitalize font-semibold text-3xl ">
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Inicio">Inicio</a>
            </div>
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Nosotros">Nosotros</a>
            </div>
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Servicios">Servicios</a>
            </div>
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Cotizacion">Cotizacion</a>
            </div>
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Destinos">Destinos</a>
            </div>
            <div className="cursor-pointer hover:text-white" onClick={cerrar}>
              <a href="#Contacto">Contacto</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
