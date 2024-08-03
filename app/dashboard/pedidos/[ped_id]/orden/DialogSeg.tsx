"use client";
import Lucide_Icon from "@/components/lucide_icono";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
export default function DialogSeg({
  titulo,
  btnText,
  btnForm,
  action,
  children,
}: {
  titulo: string;
  btnText: string | JSX.Element;
  btnForm: string;
  children: JSX.Element;
  action: (formData: FormData) => void;
}) {
  const [isOpen, setOpen] = useState(false);
  const cerrar = () => {
    setOpen(false);
  };
  const abrir = () => {
    setOpen(true);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      const resp = await action(formData); // Pasa el formData a tu acción
      console.log(resp);
    } catch (error) {
      console.log("ocurrio un error");
    } finally {
      cerrar();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {typeof btnText === "string" ? (
          <div className="self-end justify-self-end ">
            <Button
              onClick={abrir}
              className="flex gap-2 pl-2.5 text-xs py-1.5 h-auto items-center justify-center pr-3"
              variant={"outline"}
            >
              <Lucide_Icon name="Plus" size={18} />
              <span className="capitalize">{btnText}</span>
            </Button>
          </div>
        ) : (
          btnText
        )}
      </DialogTrigger>

      <DialogContent className="w-96 backdrop:bg-transparent ">
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4">
          {children}
          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              className="capitalize inline-block h-auto w-auto text-sm py-1.5 "
            >
              {btnForm}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
