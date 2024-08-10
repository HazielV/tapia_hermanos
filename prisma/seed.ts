import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const tipoEstaciones = await prisma.tipoEstacion.createMany({
    data: [
      {
        descripcion: "parada",
      },
      {
        descripcion: "frontera",
      },
      {
        descripcion: "oficina",
      },
    ],
  });
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
