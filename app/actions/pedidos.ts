"use server";
import { PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const pedidos = await prisma.pedido.findMany({});
    data = pedidos;
  } finally {
    prisma.$disconnect();
  }

  return data;
}

export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  const placas = formData.getAll("placas[]");
  const newData = await prisma.pedido.create({
    data: {
      nombre_cliente: formData.get("nombre") as string,
      correo: formData.get("correo") as string,
      telefono: Number(formData.get("telefono")),
      altura: formData.get("altura") as string,
      ancho: formData.get("ancho") as string,
      volumen: formData.get("volumenes") as string,
      peso: formData.get("peso") as string,
      formaPago: formData.get("formaPago") as string,
      tipo: formData.get("tipo") as string,
      longitud: formData.get("longitud") as string,
      codigo: "aa123",
      fecha_partida: new Date(formData.get("fPartida") as string),
      fecha_entrega: new Date(formData.get("fEntrega") as string),
      fecha_pedido: new Date(),
      precio: Number(formData.get("precio")),
      estado: 1,
      ruta: {
        connect: {
          id: Number(formData.get("ruta")),
        },
      },
      placas: {
        connectOrCreate: placas.map((placa) => ({
          where: { nroPlaca: String(placa) },
          create: { nroPlaca: String(placa) },
        })),
      },

      /* fEntrega */
    },
  });
  revalidatePath("/dashboard/pedidos");
  redirect("/dashboard/pedidos");
}
