import { Skeleton } from "@/components/ui/skeleton"

export default function AgenciesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />

            {/* Search Bar Skeleton */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Agencies Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="mt-10 text-center">
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </div>
  )
}
