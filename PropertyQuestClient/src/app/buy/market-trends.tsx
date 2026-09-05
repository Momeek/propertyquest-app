"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", price: 450000 },
  { month: "Feb", price: 460000 },
  { month: "Mar", price: 475000 },
  { month: "Apr", price: 480000 },
  { month: "May", price: 495000 },
  { month: "Jun", price: 510000 },
];

const stats = [
  { label: "Average Price", value: "$485,000", change: "+8.5%" },
  { label: "Properties Listed", value: "1,245", change: "+12.3%" },
  { label: "Days on Market", value: "45", change: "-5.2%" },
  { label: "Sale to List Ratio", value: "98.5%", change: "+1.2%" },
];

export default function MarketTrends() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
        <CardDescription>
          Real estate market trends and statistics for your selected area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price">
          <TabsList>
            <TabsTrigger value="price">Price Trends</TabsTrigger>
            <TabsTrigger value="stats">Market Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="price" className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#16a249"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 border border-[#b6b3b3] rounded-lg"
                >
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                  <div
                    className={`text-sm mt-1 ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
