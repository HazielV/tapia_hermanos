"use server";
import { PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  console.log(formData);
  if (!formData.get("origen") && !formData.get("destino")) {
    return;
  }
  const newData = await prisma.cotizacion.create({
    data: {
      nombre: formData.get("nombre") as string,
      correo: formData.get("correo") as string,
      telefono: Number(formData.get("telefono")),
      telefono_movil: Number(formData.get("telefono_movil")),
      altura: formData.get("altura") as string,
      ancho: formData.get("ancho") as string,
      volumen: formData.get("volumenes") as string,
      peso: formData.get("peso") as string,
      comentario: formData.get("comentario") as string,
      formaPago: formData.get("formaPago") as string,
      tipo: formData.get("tipo") as string,
      valor: Number(formData.get("valor")),
      longitud: formData.get("longitud") as string,
      cuidad_origen: {
        connect: {
          id: Number(formData.get("origen")),
        },
      },
      cuidad_destino: {
        connect: {
          id: Number(formData.get("destino")),
        },
      },
    },
  });
  redirect("/?enviado=1");
}
