"use client";
import Lucide_Icon from "@/components/lucide_icono";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function ParadaDrag({
  nombre,
  id,
  eliminar,
}: {
  nombre: string;
  id: number;
  eliminar: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="flex w-full justify-between relative border rounded-sm px-4 py-2 group"
    >
      <div className="flex items-center gap-2 ">
        <span>{nombre}</span>
      </div>
      <button
        type="button"
        onClick={() => eliminar(id)}
        className="text-gray-500 hover:text-red-600 p-1 bg-gray-100 hover:bg-red-50 rounded-md group-hover:visible invisible "
      >
        <Lucide_Icon name="Trash2" size={18} />
      </button>
    </div>
  );
}
