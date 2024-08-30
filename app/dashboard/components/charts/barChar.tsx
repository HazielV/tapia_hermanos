"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { mes: "Enero", valor: 186 },
  { mes: "Febrero", valor: 305 },
  { mes: "Marzo", valor: 237 },
  { mes: "Abril", valor: 73 },
  { mes: "Mayo", valor: 209 },
  { mes: "Junio", valor: 214 },
  { mes: "Julio", valor: 214 },
  { mes: "Agosto", valor: 214 },
  { mes: "Septiemebre", valor: 214 },
  { mes: "Octubre", valor: 214 },
  { mes: "Noviembre", valor: 214 },
  { mes: "Diciembre", valor: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function DashboardBarChart({ data }: { data: any[] }) {
  return (
    <Card className=" min-w-[26rem] h-full">
      <CardHeader>
        <CardTitle>Pedidos por mes</CardTitle>
        <CardDescription>Enero - Diciembre</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[100px] max-h-56 w-full"
        >
          <BarChart maxBarSize={35} accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cantidad" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando del total de pedidos por mes del año actual
        </div>
      </CardFooter>
    </Card>
  );
}
