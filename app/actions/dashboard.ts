"use server";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Short from "short-uuid";

export async function getPedidosXMes() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const añoActual = new Date().getFullYear();

    const pedidos = await prisma.pedido.findMany({
      where: {
        fecha_pedido: {
          gte: new Date(`${añoActual}-01-01`),
          lt: new Date(`${añoActual + 1}-01-01`), // Filtra hasta el último día del año actual
        },
      },
      select: {
        fecha_pedido: true,
      },
    });
    const mesesTexto = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    // Inicializar `pedidosPorMes` con todos los meses y un valor de 0
    const pedidosPorMes: { [key: string]: number } = mesesTexto.reduce(
      (acc, mes) => {
        acc[mes] = 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    pedidos.forEach((pedido) => {
      const mes = mesesTexto[new Date(pedido.fecha_pedido).getMonth()]; // Obtiene el nombre del mes
      pedidosPorMes[mes] += 1; // Incrementa el contador para el mes correspondiente
    });

    // Convertir a formato de `chartData`
    const chartData = Object.entries(pedidosPorMes).map(([mes, cantidad]) => ({
      mes,
      cantidad,
    }));
    console.log(chartData);
    data = chartData;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
