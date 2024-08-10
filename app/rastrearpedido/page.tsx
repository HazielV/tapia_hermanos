import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Buscador from "./componentes/buscador";

export default function page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="fixed w-full z-50 bg-gray-100/70 p-4 flex items-center justify-between py-2 top-0">
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

      {/* buscador */}
      <Buscador />
    </div>
  );
}
