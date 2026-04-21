"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { occupancyByMonth } from "@/lib/mock-data";

const chartConfig = {
  value: {
    label: "Ocupação",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function OccupancyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[180px] w-full">
      <AreaChart data={occupancyByMonth} accessibilityLayer margin={{ left: 4, right: 4 }}>
        <defs>
          <linearGradient id="occGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.55} />
            <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.35} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis
          tickLine={false}
          axisLine={false}
          domain={[50, 100]}
          fontSize={11}
          tickFormatter={(v) => `${v}%`}
          width={36}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => `${value}%`}
              labelKey="month"
            />
          }
        />
        <Area
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill="url(#occGradient)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
