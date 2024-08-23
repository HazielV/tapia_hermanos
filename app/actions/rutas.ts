"use server";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll(pagina: number) {
  const include = {
    parada: {
      select: {
        estacion: {
          select: {
            nombre: true,
          },
        },
      },
    },
  } as const;

  let data: {
    datos: Prisma.rutaGetPayload<{ include: typeof include }>[];
    total: number;
  } = {
    datos: [],
    total: 0,
  };
  /* let data = []; */
  const prisma = new PrismaClient();
  try {
    const datos = await prisma.ruta.findMany({
      take: 10,
      skip: 10 * (pagina - 1),
      include: include,
    });
    const total = await prisma.ruta.count();

    data.datos = datos;
    data.total = total;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function getAllActivas() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const rutas = await prisma.ruta.findMany({
      include: {
        parada: {
          select: {
            estacion: {
              select: {
                nombre: true,
              },
            },
          },
        },
      },
      /* agregar estado */
    });
    data = rutas;
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
  const paradas = formData.getAll("paradas[]");

  const newData = await prisma.ruta.create({
    data: {
      nombre: formData.get("nombre") as string,

      parada: {
        create: paradas.map((elem, index) => ({
          orden: Number(index + 1),
          estacion_id: Number(elem),
        })),
      },
    },
  });
  revalidatePath("/dashboard/rutas");
  redirect("/dashboard/rutas");
}

export async function getRuta(id: number) {
  let data = null;
  const prisma = new PrismaClient();
  try {
    const dato = await prisma.ruta.findUnique({
      where: {
        id: id,
      },
      select: {
        nombre: true,
        parada: {
          select: {
            estacion: true,
          },
        },
      },
    });
    data = dato;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function edit(id: number, formData: FormData) {
  const prisma = new PrismaClient();
  const paradas = formData.getAll("paradas[]");

  await prisma.ruta.update({
    where: {
      id: id,
    },
    data: {
      nombre: formData.get("nombre") as string,

      parada: {
        set: [],
        create: paradas.map((elem, index) => ({
          orden: Number(index + 1),
          estacion_id: Number(elem),
        })),
      },
    },
  });
  revalidatePath("/dashboard/rutas");
  redirect("/dashboard/rutas");
}
