"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Home, Calendar, Users } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const priceData = [
  { month: "Jan", sale: 450000, rent: 2200, lastYear: 420000 },
  { month: "Feb", sale: 460000, rent: 2250, lastYear: 425000 },
  { month: "Mar", sale: 475000, rent: 2300, lastYear: 430000 },
  { month: "Apr", sale: 480000, rent: 2350, lastYear: 440000 },
  { month: "May", sale: 495000, rent: 2400, lastYear: 450000 },
  { month: "Jun", sale: 510000, rent: 2450, lastYear: 460000 },
  { month: "Jul", sale: 520000, rent: 2500, lastYear: 470000 },
  { month: "Aug", sale: 515000, rent: 2550, lastYear: 475000 },
  { month: "Sep", sale: 525000, rent: 2600, lastYear: 480000 },
  { month: "Oct", sale: 530000, rent: 2650, lastYear: 485000 },
  { month: "Nov", sale: 535000, rent: 2700, lastYear: 490000 },
  { month: "Dec", sale: 540000, rent: 2750, lastYear: 500000 },
];

const marketStats = [
  {
    title: "Average Sale Price",
    value: "$525,000",
    change: "+8.5%",
    isPositive: true,
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Average Rent",
    value: "$2,650/mo",
    change: "+12.3%",
    isPositive: true,
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Days on Market",
    value: "32",
    change: "-15.8%",
    isPositive: true,
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Buyer Demand",
    value: "High",
    change: "+5.2%",
    isPositive: true,
    icon: <Users className="h-5 w-5" />,
  },
];

const supplyDemandData = [
  { month: "Jan", supply: 1200, demand: 1800 },
  { month: "Feb", supply: 1250, demand: 1850 },
  { month: "Mar", supply: 1300, demand: 1900 },
  { month: "Apr", supply: 1350, demand: 1950 },
  { month: "May", supply: 1400, demand: 2000 },
  { month: "Jun", supply: 1450, demand: 2050 },
  { month: "Jul", supply: 1500, demand: 2100 },
  { month: "Aug", supply: 1550, demand: 2150 },
  { month: "Sep", supply: 1600, demand: 2200 },
  { month: "Oct", supply: 1650, demand: 2250 },
  { month: "Nov", supply: 1700, demand: 2300 },
  { month: "Dec", supply: 1750, demand: 2350 },
];

export default function PriceTrends() {
  return (
    <div className="space-y-8">
      {/* Market Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
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
                {stat.change} from last year
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price Trends</CardTitle>
          <CardDescription>
            Average property prices over the past 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sale">
            <TabsList className="mb-4">
              <TabsTrigger value="sale">Sale Prices</TabsTrigger>
              <TabsTrigger value="rent">Rental Prices</TabsTrigger>
              <TabsTrigger value="comparison">Year-over-Year</TabsTrigger>
            </TabsList>
            <TabsContent value="sale" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Average Sale Price",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sale"
                    name="Sale Price"
                    stroke="#16a249"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="rent" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Average Rent",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rent"
                    name="Monthly Rent"
                    stroke="#16a249"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="comparison" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Price",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sale"
                    name="Current Year"
                    stroke="#16a249"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lastYear"
                    name="Previous Year"
                    stroke="#000000"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Supply & Demand */}
      <Card>
        <CardHeader>
          <CardTitle>Supply & Demand</CardTitle>
          <CardDescription>
            Property supply vs. buyer demand over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplyDemandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="supply" name="Property Supply" fill="#16a249" />
              <Bar
                dataKey="demand"
                name="Buyer Demand"
                fill="hsl(var(--primary))"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Market Sentiment</CardTitle>
              <CardDescription>Current market conditions</CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{`Seller's Market`}</div>
            <p className="text-gray-500">
              High demand and limited inventory are creating favorable
              conditions for sellers, with properties selling quickly and often
              above asking price.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Inventory Level</p>
                <p className="font-medium">Low</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Price Trend</p>
                <p className="font-medium">Increasing</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Days on Market</p>
                <p className="font-medium">32 days</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Sale-to-List Ratio</p>
                <p className="font-medium">102%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Market Forecast</CardTitle>
              <CardDescription>
                Projected trends for next 6 months
              </CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">Moderate Growth</div>
            <p className="text-gray-500">
              The market is expected to continue growing at a moderate pace,
              with price appreciation slowing slightly but remaining positive.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Price Growth</p>
                <p className="font-medium">+3-5%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Inventory Change</p>
                <p className="font-medium">+10%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Interest Rates</p>
                <p className="font-medium">Stable</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Market Balance</p>
                <p className="font-medium">Slight Shift</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
