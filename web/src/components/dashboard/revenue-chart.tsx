"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { revenueByMonth } from "@/lib/mock-data";

const chartConfig = {
  airbnb: {
    label: "Airbnb",
    color: "var(--chart-5)",
  },
  booking: {
    label: "Booking.com",
    color: "var(--chart-1)",
  },
  vrbo: {
    label: "Vrbo",
    color: "var(--chart-4)",
  },
  direto: {
    label: "Direto",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <BarChart data={revenueByMonth} accessibilityLayer>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.4} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          fontSize={11}
          tickFormatter={(v) =>
            new Intl.NumberFormat("pt-BR", {
              notation: "compact",
              maximumFractionDigits: 0,
            }).format(v)
          }
          width={42}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 0,
                }).format(Number(value))
              }
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="booking" stackId="a" fill="var(--color-booking)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="airbnb" stackId="a" fill="var(--color-airbnb)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="vrbo" stackId="a" fill="var(--color-vrbo)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="direto" stackId="a" fill="var(--color-direto)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
