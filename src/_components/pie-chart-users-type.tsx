"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/_components/ui/chart"

const chartData = [
  { accessType: "admin", users: 275, fill: "#9ca79c" },
  { accessType: "supervisor", users: 50, fill: "#5e655a" },
  { accessType: "invigilator", users: 287, fill: "#494e4b" },
  { accessType: "speaking", users: 173, fill: "#3e413f" },
]

const chartConfig = {
  Users: {
    label: "Users",
  },
  Admins: {
    label: "Admins",
    color: "hsl(var(--chart-1))",
  },
  Supervisors: {
    label: "Supervisors",
    color: "hsl(var(--chart-2))",
  },
  Invigilators: {
    label: "Invigilators",
    color: "hsl(var(--chart-3))",
  },
  Speakings: {
    label: "Speakings",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function PieChartUsersType() {
  const totalUsers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users - Donut with Text</CardTitle>
        <CardDescription>Total users by access role</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="users"
              nameKey="accessType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Users
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total users system
        </div>
      </CardFooter>
    </Card>
  )
}
