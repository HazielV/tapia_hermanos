"use client";
import Lucide_Icon from "@/components/lucide_icono";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import useSidebarStore from "@/store/sidebar";
import { icons, X } from "lucide-react";

import React from "react";
import Link from "next/link";
export default function Sidebar() {
  const pathname = usePathname();
  type IconName = keyof typeof icons;
  interface menu {
    id: number;
    descripcion: string;
    icono: IconName;
    url: string;
    path: string;
  }
  const menus: menu[] = [
    {
      id: 2,
      descripcion: "usuarios",
      icono: "SquareUser",
      path: "usuarios",
      url: "/dashboard/usuarios",
    },
    {
      id: 3,
      descripcion: "Estaciones",
      icono: "MapPinned",
      path: "estaciones",
      url: "/dashboard/estaciones",
    },
    {
      id: 4,
      descripcion: "Rutas",
      icono: "Truck",
      path: "rutas",
      url: "/dashboard/rutas",
    },
    {
      id: 5,
      descripcion: "Pedidos",
      icono: "PackageOpen",
      path: "pedidos",
      url: "/dashboard/pedidos",
    },
  ];

  const { isOpen, toggle } = useSidebarStore();

  return (
    <div
      id="elemento"
      className="z-50  px-3 fixed transition-all duration-300 bg-white w-60 h-full shadow-lg data-[sidebar=true]:-translate-x-full md:data-[sidebar=true]:translate-x-0 md:data-[sidebar=true]:w-[64px] md:relative md:data-[sidebar=false]:w-60 flex flex-col gap-3 py-20 "
      data-sidebar={isOpen}
    >
      <button
        onClick={toggle}
        className="absolute top-3 right-3  transition duration-300 hover:rotate-90 md:hidden block  "
      >
        <X width={30} height={30} />
      </button>

      <TooltipProvider delayDuration={0}>
        <React.Fragment>
          {!isOpen ? (
            <Link href={"/dashboard"}>
              <div
                className={
                  "flex px-2.5 py-2.5  rounded-md items-center gap-3 font-medium capitalize text-sm cursor-pointer " +
                  (pathname === "/dashboard"
                    ? " bg-indigo-50/60 text-indigo-600"
                    : " hover:bg-indigo-50/60")
                }
              >
                <div className="">
                  <Lucide_Icon name={"Home"} size={20} />
                </div>
                <span className="text-black">inicio</span>
              </div>
            </Link>
          ) : (
            <nav>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={"/dashboard"}>
                    <div
                      className={
                        "px-2.5 py-2.5  rounded-md cursor-pointer " +
                        (pathname === "/dashboard"
                          ? " bg-indigo-50/60 text-indigo-600"
                          : " hover:bg-indigo-50/60")
                      }
                    >
                      <Lucide_Icon name={"Home"} size={20} />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center capitalize gap-4 cursor-pointer bg-black text-white "
                >
                  <span>inicio</span>
                </TooltipContent>
              </Tooltip>
            </nav>
          )}
        </React.Fragment>
        {menus.map((elem, index) => (
          <React.Fragment key={index}>
            {!isOpen ? (
              <Link href={elem.url}>
                <div
                  className={
                    "flex px-2.5 py-2.5  rounded-md items-center gap-3 font-medium capitalize text-sm cursor-pointer " +
                    (pathname.includes(elem.path)
                      ? " bg-indigo-50/60 text-indigo-600"
                      : " hover:bg-indigo-50/60")
                  }
                >
                  <div className="">
                    <Lucide_Icon name={elem.icono} size={20} />
                  </div>
                  <span className="text-black">{elem.descripcion}</span>
                </div>
              </Link>
            ) : (
              <nav>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href={elem.url}>
                      <div
                        className={
                          "px-2.5 py-2.5  rounded-md cursor-pointer transition-colors duration-300 " +
                          (pathname.includes(elem.path)
                            ? " bg-indigo-50/60 text-indigo-600"
                            : " hover:bg-indigo-50/60")
                        }
                      >
                        <Lucide_Icon name={elem.icono} size={20} />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center capitalize gap-4 cursor-pointer bg-black text-white "
                  >
                    <span>{elem.descripcion}</span>
                  </TooltipContent>
                </Tooltip>
              </nav>
            )}
          </React.Fragment>
        ))}
      </TooltipProvider>
    </div>
  );
}
