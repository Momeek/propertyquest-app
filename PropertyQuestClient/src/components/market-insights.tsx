import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Home } from "lucide-react";

interface MarketStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const marketStats: MarketStat[] = [
  {
    label: "Average Sale Price",
    value: "$425,000",
    change: "+5.2%",
    isPositive: true,
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    label: "Properties Listed",
    value: "1,245",
    change: "+12.8%",
    isPositive: true,
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Days on Market",
    value: "32",
    change: "-8.5%",
    isPositive: true,
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    label: "Mortgage Rate",
    value: "4.75%",
    change: "+0.25%",
    isPositive: false,
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

export default function MarketInsights() {
  return (
    <section className="py-12 flex bg-[#ffffff] justify-center px-6">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Market Insights</h2>
            <p className="text-gray-500 mt-2">
              Stay updated with the latest real estate trends
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.label}
                </CardTitle>
                <div
                  className={`p-2 rounded-full ${
                    stat.isPositive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-sm mt-1 ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
