import React from "react";
import { Bar, BarChart, CartesianGrid } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { DashboardBarChart } from "./components/charts/barChar";
import { getPedidosXMes } from "../actions/dashboard";
export default async function page() {
  const data = await getPedidosXMes();
  return (
    <div className="p-8 pt-10 flex flex-col gap-5 overflow-hidden">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl font-medium  ">Inicio</h1>
      </div>

      <div className=" rounded-xl  mt-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden  ">
        <DashboardBarChart data={data} />
      </div>
    </div>
  );
}
