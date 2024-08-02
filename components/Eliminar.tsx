"use client";
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

export default function Eliminar({
  titulo,
  btnText,

  action,
  children,
}: {
  titulo: string;
  btnText: string | JSX.Element;

  children?: JSX.Element;
  action: (formData: FormData) => void;
}) {
  const [open, setOpen] = useState(false);

  const abir = () => {
    setOpen(true);
  };
  const cerrar = () => {
    setOpen(false);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild onClick={abir}>
        {btnText}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-auto p-5">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{titulo}</AlertDialogDescription>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="w-full flex justify-between gap-2">
            <Button type="button" onClick={cerrar} variant={"outline"}>
              Cancelar
            </Button>

            <Button type="submit" variant="destructive">
              Eliminar
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
