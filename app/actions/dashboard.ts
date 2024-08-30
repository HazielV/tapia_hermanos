"use server";
import { Prisma, PrismaClient, user } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Short from "short-uuid";
const generarNombre = (array: string[]) => {
  let salida = "";
  array.forEach((elem) => {
    salida += elem.trim().at(0);
  });
  return salida;
};
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

    data = chartData;
  } finally {
    prisma.$disconnect();
  }

  return data;
}
export async function getVisitasDeposMes() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const rutas = await prisma.ruta.findMany();
    const añoActual = new Date().getFullYear();
    const pedidos = await prisma.pedido.findMany({
      where: {
        fecha_pedido: {
          gte: new Date(`${añoActual}-01-01`),
          lt: new Date(`${añoActual + 1}-01-01`), // Filtra hasta el último día del año actual
        },
        AND: {
          estado: {
            equals: 4,
          },
        },
      },
      select: {
        fecha_pedido: true,
        ruta: true,
      },
    });

    const rutasPorAnio: { [key: string]: number } = rutas.reduce(
      (acc, ruta) => {
        acc[ruta.nombre] = 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    pedidos.forEach((pedido) => {
      const rutaNombre = pedido.ruta.nombre; // Obtiene el nombre del mes

      rutasPorAnio[rutaNombre] += 1; // Incrementa el contador para el mes correspondiente
    });

    // Convertir a formato de `pieChartData`
    const chartData = Object.entries(rutasPorAnio).map(([ruta, cantidad]) => ({
      ruta,
      cantidad,
      fill: `var(--color-${generarNombre(ruta.split("-"))})`,
    }));

    data = chartData;
  } finally {
    prisma.$disconnect();
  }
  return data;
}
export async function getEstacionesAnio() {
  let data = [];
  const prisma = new PrismaClient();
  try {
    const paradas = await prisma.parada.findMany({
      include: {
        estacion: true,
      },
    });
    const añoActual = new Date().getFullYear();
    const seguimientoParada = await prisma.seguimiento.groupBy({
      by: ["parada_id", "fecha"],
      where: {
        fecha: {
          gte: new Date(`${añoActual}-01-01`),
          lt: new Date(`${añoActual + 1}-01-01`), // Filtra hasta el último día del año actual
        },
      },
    });

    const estacionesXAnio: { [key: string]: number } = paradas.reduce(
      (acc, parada) => {
        acc[parada.estacion.nombre] = 0;
        return acc;
      },
      {} as { [key: string]: number }
    );

    seguimientoParada.forEach((seguimiento) => {
      const rutaNombre = paradas.find(
        (elem) => elem.id === seguimiento.parada_id
      )?.estacion.nombre; // Obtiene el nombre del mes
      if (rutaNombre) estacionesXAnio[rutaNombre] += 1; // Incrementa el contador para el mes correspondiente
    });

    // Convertir a formato de `pieChartData`
    const chartData = Object.entries(estacionesXAnio).map(
      ([estacion, cantidad]) => ({
        estacion,
        cantidad,
      })
    );

    data = chartData;
  } finally {
    prisma.$disconnect();
  }
  return data;
}
