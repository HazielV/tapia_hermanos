"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lucide_Icon from "@/components/lucide_icono";
import CreateParada from "./createParada";
import { estacion } from "@prisma/client";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import ParadaDrag from "./paradaDrag";
export default function Paradas({
  estaciones,
  defaultEstaciones = [],
}: {
  estaciones: estacion[];
  defaultEstaciones: estacion[];
}) {
  const [isOpen, setOpen] = useState(false);
  const cerrar = () => {
    setOpen(false);
  };
  const abrir = () => {
    setOpen(true);
  };
  const sensonres = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [paElegidas, setPaElegidas] = useState<estacion[]>(defaultEstaciones);
  const adicionar = (p: estacion) => {
    /* setPaElegidas((prev) => [...prev, p]); */
    setPaElegidas((prev) => {
      if (prev.find((elem) => elem.id === p.id)) {
        return prev;
      }
      return [...prev, p];
    });
  };
  const eliminar = (p: number) => {
    setPaElegidas((prev) => {
      const enconntrado = prev.find((elem) => elem.id === p);
      if (!enconntrado) return prev;
      const nueva = prev.filter((elem) => elem.id !== p);
      return nueva;
    });
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPaElegidas((items) => {
        const oldIndex = items.findIndex((elem) => elem.id === active.id);
        const newIndex = items.findIndex((elem) => elem.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <React.Fragment>
      {paElegidas.map((elem) => (
        <input type="hidden" name="paradas[]" value={elem.id} key={elem.id} />
      ))}

      <h1 className="font-medium text-lg md:col-span-2">Paradas</h1>
      <div className="grid w-full items-center gap-1.5 md:col-span-2 border rounded-md p-5 overflow-x-hidden">
        <div className="flex flex-col gap-2 ">
          <DndContext sensors={sensonres} onDragEnd={handleDragEnd}>
            <SortableContext
              items={paElegidas}
              strategy={verticalListSortingStrategy}
            >
              {paElegidas?.map((parada, index) => (
                <ParadaDrag
                  eliminar={eliminar}
                  id={parada.id}
                  nombre={parada.nombre}
                  key={index}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div>
            <Dialog open={isOpen} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={abrir}
                  className="flex gap-2 pl-2.5 text-xs py-1.5 h-auto items-center justify-center pr-3"
                  variant={"outline"}
                >
                  <Lucide_Icon name="Plus" size={18} />
                  <span className="capitalize">agregar parada</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="w-96 backdrop:bg-transparent ">
                <DialogHeader>
                  <DialogTitle>Nueva parada</DialogTitle>

                  <CreateParada
                    adicionar={adicionar}
                    estaciones={estaciones}
                    cerrar={cerrar}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
