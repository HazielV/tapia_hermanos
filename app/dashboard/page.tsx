import React from "react";
import { Bar, BarChart, CartesianGrid } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { DashboardBarChart } from "./components/charts/barChar";
import {
  getEstacionesAnio,
  getPedidosXMes,
  getVisitasDeposMes,
} from "../actions/dashboard";
import { DashboardPieChart } from "./components/charts/pieChart";
import { DashboardRadarChart } from "./components/charts/radarChart";
export default async function page() {
  const data = await getPedidosXMes();
  const dataPie = await getVisitasDeposMes();
  const dataRadar = await getEstacionesAnio();
  return (
    <div className="p-4 md:p-8 py-10 flex flex-col gap-5 flex-1 overflow-y-auto">
      <div className="flex w-full  justify-between items-center">
        <h1 className="text-4xl font-medium  ">Inicio</h1>
      </div>

      <div className=" rounded-xl  mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5   ">
        <div className="overflow-x-auto h-full md:col-span-2">
          <DashboardBarChart data={data} />
        </div>
        <div className="overflow-x-auto h-full">
          <DashboardPieChart data={dataPie} />
        </div>
        <div>
          <DashboardRadarChart data={dataRadar} />
        </div>
      </div>
    </div>
  );
}
