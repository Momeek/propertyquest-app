import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  author: {
    name: string
    title: string
    avatar: string
  }
  category: string
  readTime: string
}

const articles: Article[] = [
  {
    id: "market-shift-2023",
    title: "The Shifting Real Estate Landscape: What to Expect in 2023",
    excerpt:
      "Our chief economist analyzes current market conditions and provides insights into how economic factors are reshaping the real estate market.",
    date: "July 10, 2023",
    image: "/placeholder.svg?height=200&width=300",
    author: {
      name: "Dr. Sarah Johnson",
      title: "Chief Economist",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    category: "Market Analysis",
    readTime: "8 min read",
  },
  {
    id: "investment-strategies-2023",
    title: "Investment Strategies for a Changing Market",
    excerpt:
      "Learn about effective investment approaches in today's market conditions, including portfolio diversification and emerging opportunities.",
    date: "June 28, 2023",
    image: "/placeholder.svg?height=200&width=300",
    author: {
      name: "Michael Chen",
      title: "Investment Advisor",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    category: "Investment",
    readTime: "6 min read",
  },
  {
    id: "tech-impact-real-estate",
    title: "How Technology is Transforming Real Estate Transactions",
    excerpt:
      "Explore how digital innovations are streamlining buying and selling processes and what this means for future real estate transactions.",
    date: "July 5, 2023",
    image: "/placeholder.svg?height=200&width=300",
    author: {
      name: "Emma Rodriguez",
      title: "Technology Director",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    category: "Technology",
    readTime: "5 min read",
  },
]

export default function ExpertAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{article.category}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {article.date}
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-gray-500">{article.author.title}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link href="/insights/articles">
          <Button variant="outline">
            View All Expert Articles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Featured Expert */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative h-40 w-40 rounded-full overflow-hidden">
              <Image
                src="/user.jpg"
                alt="Dr. Sarah Johnson"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Meet Our Chief Economist</h3>
              <p className="text-primary font-medium mb-4">Dr. Sarah Johnson</p>
              <p className="text-gray-700 mb-4 max-w-2xl">
                Dr. Sarah Johnson brings over 15 years of experience analyzing real estate markets and economic trends.
                With a Ph.D. in Economics from Stanford University and previous roles at the Federal Reserve and leading
                research institutions, she provides valuable insights into market dynamics and future trends.
              </p>
              <Button className="gap-2">
                <User className="h-4 w-4" />
                View Expert Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
