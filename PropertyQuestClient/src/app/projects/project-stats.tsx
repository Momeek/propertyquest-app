import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, TrendingUp, Users, Home } from "lucide-react"

const stats = [
  {
    title: "New Projects Launched",
    value: "124",
    change: "+12% from last year",
    icon: <Building className="h-5 w-5" />,
    isPositive: true,
  },
  {
    title: "Average Price Per Sq Ft",
    value: "$850",
    change: "+5.2% from last quarter",
    icon: <TrendingUp className="h-5 w-5" />,
    isPositive: true,
  },
  {
    title: "Investor Interest",
    value: "8,500+",
    change: "+18% year-over-year",
    icon: <Users className="h-5 w-5" />,
    isPositive: true,
  },
  {
    title: "Units Sold Off-Plan",
    value: "3,245",
    change: "+7.8% from last quarter",
    icon: <Home className="h-5 w-5" />,
    isPositive: true,
  },
]

export default function ProjectStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
            <div
              className={`p-2 rounded-full ${
                stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-sm mt-1 ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

