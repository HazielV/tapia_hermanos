"use server";
import { PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Short from "short-uuid";

export async function getAll() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        ruta: true,
      },
    });
    data = pedidos;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function updateSeguimiento(pedido_id: number, formData: FormData) {
  const prisma = new PrismaClient();
  await prisma.seguimiento.create({
    data: {
      fecha: new Date().toISOString(),
      parada_id: Number(formData.get("parada_id")),
      pedido_id: Number(pedido_id),
    },
  });
  revalidatePath(`/dashboard/pedidos/${String(pedido_id)}/ver`);
}
/* getPedido */
export async function getPedido(id: number) {
  let data = null;
  const prisma = new PrismaClient();
  try {
    const result = await prisma.pedido.findUnique({
      where: {
        id: id,
      },
      include: {
        seguimiento: {
          include: {
            parada: true,
          },
        },
        ruta: {
          include: {
            parada: {
              include: {
                estacion: true,
              },
            },
          },
        },
      },
    });
    data = result;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  const placas = formData.getAll("placas[]");

  const translator = Short();
  const shortUUID = translator.new();
  /* const translator = ShortUniqueId({'length': 10})
  const shortUUID = translator.new() // Genera un UUID corto */

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
      codigo: shortUUID,
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
