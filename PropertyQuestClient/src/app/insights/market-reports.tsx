import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Download, ArrowRight } from "lucide-react"

interface Report {
  id: string
  title: string
  description: string
  date: string
  image: string
  type: "Quarterly" | "Annual" | "Special" | "Forecast"
  downloadUrl: string
}

const reports: Report[] = [
  {
    id: "q2-2023",
    title: "Q2 2023 Market Report",
    description:
      "Comprehensive analysis of the real estate market performance in Q2 2023, including price trends, inventory levels, and market forecasts.",
    date: "July 15, 2023",
    image: "/placeholder.svg?height=200&width=300",
    type: "Quarterly",
    downloadUrl: "#",
  },
  {
    id: "annual-2022",
    title: "2022 Annual Market Review",
    description:
      "A detailed review of the real estate market performance throughout 2022, with year-over-year comparisons and long-term trend analysis.",
    date: "January 20, 2023",
    image: "/placeholder.svg?height=200&width=300",
    type: "Annual",
    downloadUrl: "#",
  },
  {
    id: "investment-2023",
    title: "Investment Opportunities Report",
    description:
      "Analysis of emerging investment opportunities in the real estate market, including high-growth neighborhoods and property types.",
    date: "May 5, 2023",
    image: "/placeholder.svg?height=200&width=300",
    type: "Special",
    downloadUrl: "#",
  },
  {
    id: "forecast-2023",
    title: "2023-2024 Market Forecast",
    description:
      "Projections for the real estate market over the next 12-18 months, including price trends, inventory changes, and economic factors.",
    date: "June 10, 2023",
    image: "/placeholder.svg?height=200&width=300",
    type: "Forecast",
    downloadUrl: "#",
  },
]

export default function MarketReports() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <Card key={report.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative h-48 md:h-auto md:w-1/3">
              <Image src={report.image || "/placeholder.svg"} alt={report.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4 md:w-2/3 flex flex-col">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={
                      report.type === "Quarterly"
                        ? "border-blue-500 text-blue-500"
                        : report.type === "Annual"
                          ? "border-purple-500 text-purple-500"
                          : report.type === "Special"
                            ? "border-amber-500 text-amber-500"
                            : "border-green-500 text-green-500"
                    }
                  >
                    {report.type} Report
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {report.date}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{report.title}</h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{report.description}</p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Link href={`/insights/reports/${report.id}`} className="flex-1">
                  <Button size="sm" className="w-full gap-1">
                    <FileText className="h-4 w-4" />
                    Read Report
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}

      <div className="md:col-span-2 text-center mt-4">
        <Link href="/insights/reports">
          <Button variant="outline">
            View All Market Reports
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
