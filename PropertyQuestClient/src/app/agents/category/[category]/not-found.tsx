import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container max-w-md text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-gray-600 mb-6">
            {`Sorry, we couldn't find the agent category you're looking for. It may have been removed or the URL might be
            incorrect.`}
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/agents">
              <Button className="w-full">Browse All Agent Categories</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
