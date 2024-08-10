"use server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const clave = process.env.PRIVATE_KEY as string;
const key = new TextEncoder().encode(clave);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}
export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) return null;
  return await decrypt(session);
}
export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
  redirect(`/login`);
}
export async function login(prevState: any, formData: FormData) {
  const prisma = new PrismaClient();

  const usuario =
    (await prisma.user.findUnique({
      where: {
        login: formData.get("usuario") as string,
      },
      select: {
        password: true,
        persona: {
          select: {
            nombre: true,
            primerApellido: true,
            segundoApellido: true,
          },
        },
      },
    })) || null;

  if (usuario) {
    const comparar = await bcrypt.compare(
      formData.get("password") as string,
      usuario?.password as string
    );
    console.log("comparar", comparar);
    if (comparar) {
      const data = {
        usuario: usuario.persona,
      };
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await encrypt(data);

      cookies().set("session", session, {
        expires,
        httpOnly: true,
        path: "/",
      });
      redirect(`/dashboard`);
    } else {
      return { message: "error credenciales" };
    }
  } else {
    return { message: "error credenciales" };
  }
}
