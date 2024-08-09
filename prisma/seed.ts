import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const newUser = await prisma.user.create({
    data: {
      persona: {
        create: {
          nombre: "administrador",
          primerApellido: "administrador",
          segundoApellido: "administrador",
          nroDocumento: 10,
        },
      },
      login: "administrador",
      password: "$2a$10$TNS1UO5guCjeVu6A3CiPEuxvKL42hL0NZT.0DT/rkb8LrB7Khpe.C",
    },
  });
  console.log(newUser);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
