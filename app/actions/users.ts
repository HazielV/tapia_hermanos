"use server";
import { PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAll() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        persona: {
          select: {
            nombre: true,
            primerApellido: true,
            segundoApellido: true,
          },
        },
      },
    });
    data = users;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  const newUser = await prisma.user.create({
    data: {
      login: formData.get("usuario") as string,
      password: formData.get("password") as string,
      persona: {
        create: {
          nombre: formData.get("nombre") as string,
          primerApellido: formData.get("primerApellido") as string,
          segundoApellido: formData.get("segundoApellido") as string,
          nroDocumento: Number(formData.get("nroDocumento")),
        },
      },
    },
  });
  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}
export async function getUser(id: number) {
  let data = null;
  const prisma = new PrismaClient();
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        login: true,
        persona: {
          select: {
            nombre: true,
            primerApellido: true,
            segundoApellido: true,
            nroDocumento: true,
          },
        },
      },
    });
    data = users;
  } finally {
    prisma.$disconnect();
  }

  return data;
}

export async function edit(userId: number, formData: FormData) {
  const prisma = new PrismaClient();
  const newUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      login: formData.get("usuario") as string,
      persona: {
        update: {
          nombre: formData.get("nombre") as string,
          primerApellido: formData.get("primerApellido") as string,
          segundoApellido: formData.get("segundoApellido") as string,
          nroDocumento: Number(formData.get("nroDocumento")),
        },
      },
    },
  });
  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}
