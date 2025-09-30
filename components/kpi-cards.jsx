"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  BarChart3,
  Search,
} from "lucide-react";

const kpiCards = [
  {
    title: "Total AI Tools",
    value: "1,250",
    change: "+12.5%",
    trend: "up",
    description: "New tools added this month",
    subtitle: "Tools discovered for the last 6 months",
    icon: Search,
  },
  {
    title: "Active Users",
    value: "2,456",
    change: "+8.2%",
    trend: "up",
    description: "Growing user base",
    subtitle: "Users exploring AI tools",
    icon: Users,
  },
  {
    title: "AI Stacks",
    value: "45",
    change: "+15.0%",
    trend: "up",
    description: "Curated collections created",
    subtitle: "Stacks exceed targets",
    icon: Package,
  },
  {
    title: "Tool Categories",
    value: "28",
    change: "+3.6%",
    trend: "up",
    description: "Categories expanded",
    subtitle: "Better organization achieved",
    icon: BarChart3,
  },
];

export default function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {card.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  card.trend === "up" ? "text-green-500" : "text-red-500"
                }
              >
                {card.change}
              </span>
              <span>{card.description}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
