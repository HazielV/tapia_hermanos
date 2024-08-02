"use client";

import Lucide_Icon from "@/components/lucide_icono";
import useSidebarStore from "@/store/sidebar";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ logout }: { logout: () => void }) {
  const { toggle } = useSidebarStore();
  return (
    <div className="w-full bg-white shadow-md px-5 py-3.5 flex justify-between z-50">
      <button onClick={toggle} className="outline-none">
        <Menu />
      </button>

      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger>
          <div className="rounded-full grid place-content-center h-10 w-10 bg-indigo-500 hover:bg-indigo-600 text-white font-medium">
            HE
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form id="logout" action={logout} className="w-full">
              <button
                type="submit"
                form="logout"
                className="flex gap-2 items-center capitalize w-full justify-between"
              >
                <span>cerrar sesion</span>
                <Lucide_Icon name="LogOut" size={18} />
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
