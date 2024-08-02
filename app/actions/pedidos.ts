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
        seguimiento: true,
      },
      orderBy: {
        id: "asc",
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
      fecha: new Date(formData.get("fecha") as string).toISOString(),
      parada_id: Number(formData.get("parada_id")),
      pedido_id: Number(pedido_id),
    },
  });
  revalidatePath(`/dashboard/pedidos/${String(pedido_id)}/ver`);
}
export async function finalizarSeguimiento(
  pedido_id: number,
  formData: FormData
) {
  const prisma = new PrismaClient();
  await prisma.pedido.update({
    where: {
      id: pedido_id,
    },
    data: {
      fecha_entrega: new Date(
        formData.get("fechaLlegada") as string
      ).toISOString(),
      estado: 4,
    },
  });
  revalidatePath("/dashboard/pedidos");
  redirect("/dashboard/pedidos");
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
        placas: {
          orderBy: { id: "asc" },
        },
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
      altura: Number(formData.get("altura")),
      ancho: Number(formData.get("ancho")),
      volumen: Number(formData.get("volumenes")),
      peso: Number(formData.get("peso")),
      formaPago: formData.get("formaPago") as string,
      tipo: formData.get("tipo") as string,
      longitud: Number(formData.get("longitud")),
      codigo: shortUUID,
      fecha_partida: new Date(formData.get("fPartida") as string),
      fecha_entrega: new Date(formData.get("fEntrega") as string),
      fecha_pedido: new Date(),
      precio: Number(formData.get("precio")),
      estado: 3,
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
export async function edit(id: number, formData: FormData) {
  const prisma = new PrismaClient();
  const placas = formData.getAll("placas[]");

  await prisma.pedido.update({
    where: {
      id: id,
    },
    data: {
      nombre_cliente: formData.get("nombre") as string,
      correo: formData.get("correo") as string,
      telefono: Number(formData.get("telefono")),
      altura: Number(formData.get("altura")),
      ancho: Number(formData.get("ancho")),
      volumen: Number(formData.get("volumenes")),
      peso: Number(formData.get("peso")),
      formaPago: formData.get("formaPago") as string,
      tipo: formData.get("tipo") as string,
      longitud: Number(formData.get("longitud")),
      fecha_partida: new Date(formData.get("fPartida") as string),
      fecha_entrega: new Date(formData.get("fEntrega") as string),
      fecha_pedido: new Date(),
      precio: Number(formData.get("precio")),
      estado: 3,
      ruta: {
        connect: {
          id: Number(formData.get("ruta")),
        },
      },
      placas: {
        set: [],
        connectOrCreate: placas.map((placa) => ({
          where: { nroPlaca: String(placa) },
          create: { nroPlaca: String(placa) },
        })),
      },
    },
  });
  revalidatePath("/dashboard/pedidos");
  redirect("/dashboard/pedidos");
}
/* entregar pedido*/
export async function entregarPedido(formData: FormData) {
  const prisma = new PrismaClient();
  await prisma.pedido.update({
    where: {
      id: Number(formData.get("pedido_id")),
    },
    data: {
      fecha_entrega: new Date(
        formData.get("fechaLlegada") as string
      ).toISOString(),
      estado: 5,
    },
  });

  revalidatePath("/dashboard/pedidos");
  redirect("/dashboard/pedidos");
}
