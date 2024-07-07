"use server";
import { PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const estaciones = await prisma.estacion.findMany({});
    data = estaciones;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function getAllEstacionesActivas() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const estaciones = await prisma.estacion.findMany({
      where: {
        estado: 1,
      },
    });
    data = estaciones;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function tipoEstaciones() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const estaciones = await prisma.tipoEstacion.findMany({});
    data = estaciones;
  } finally {
    prisma.$disconnect();
  }

  return data;
}

export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  const newData = await prisma.estacion.create({
    data: {
      nombre: formData.get("nombre") as string,
      ubicacion: formData.get("ubicacion") as string,
      tipo: {
        connect: {
          id: Number(formData.get("tipoEstacion")),
        },
      },
    },
  });
  revalidatePath("/dashboard/estaciones");
  redirect("/dashboard/estaciones");
}
/* getEstacion */
export async function getEstacion(id: number) {
  let data = null;
  const prisma = new PrismaClient();
  try {
    const estacion = await prisma.estacion.findUnique({
      where: {
        id: id,
      },
      select: {
        nombre: true,
        ubicacion: true,
        tipo: {
          select: {
            id: true,
          },
        },
      },
    });
    data = estacion;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function edit(userId: number, formData: FormData) {
  const prisma = new PrismaClient();
  await prisma.estacion.update({
    where: {
      id: userId,
    },
    data: {
      nombre: formData.get("nombre") as string,
      ubicacion: formData.get("ubicacion") as string,
      tipo: {
        connect: {
          id: Number(formData.get("tipoEstacion")),
        },
      },
    },
  });
  revalidatePath("/dashboard/estaciones");
  redirect("/dashboard/estaciones");
}
