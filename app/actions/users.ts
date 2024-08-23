"use server";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
export async function getAll(pagina: number) {
  const select = {
    id: true,
    estado: true,
    login: true,
    persona: {
      select: {
        nombre: true,
        primerApellido: true,
        segundoApellido: true,
      },
    },
  } as const;

  let data: {
    usuarios: Prisma.userGetPayload<{ select: typeof select }>[];
    total: number;
  } = {
    usuarios: [],
    total: 0,
  };
  const prisma = new PrismaClient();
  try {
    const usuarios = await prisma.user.findMany({
      take: 10,
      skip: 10 * (pagina - 1),
      select: select,
    });
    const total = await prisma.user.count();

    data.usuarios = usuarios;
    data.total = total;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function create(formData: FormData) {
  const prisma = new PrismaClient();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    saltRounds
  );

  const newUser = await prisma.user.create({
    data: {
      login: formData.get("usuario") as string,
      password: hashedPassword,
      estado: 1,
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
export async function deshabilitar(formData: FormData) {
  const prisma = new PrismaClient();
  await prisma.user.update({
    where: {
      id: Number(formData.get("id")),
    },
    data: {
      estado: 2,
    },
  });
  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}
export async function habilitar(formData: FormData) {
  const prisma = new PrismaClient();
  await prisma.user.update({
    where: {
      id: Number(formData.get("id")),
    },
    data: {
      estado: 1,
    },
  });
  revalidatePath("/dashboard/usuarios");
  redirect("/dashboard/usuarios");
}
