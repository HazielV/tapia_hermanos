import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Buscador from "./componentes/buscador";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="fixed w-full z-50 bg-gray-100/70 p-4 flex items-center justify-between py-2 top-0">
        {/* logo */}
        <div className="h-16 flex">
          <img src="/logo.png" alt="" />
        </div>
        {/* MENUS */}
        <div className="">
          <div className="grid  gap-8 font-medium">
            <Link href={"/"} className="flex">
              <div className="cursor-pointer ">Inicio</div>
            </Link>
          </div>
        </div>
      </div>

      {/* buscador */}
      <Buscador />
    </div>
  );
}
