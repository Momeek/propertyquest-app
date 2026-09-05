import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-[500px] bg-gray-200">
        <div className="relative container h-full flex flex-col justify-center">
          <div className="max-w-2xl mb-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-2/3 mb-8" />
          </div>

          <Skeleton className="h-[120px] w-full max-w-4xl rounded-lg" />
        </div>
      </div>

      {/* Featured Projects Skeleton */}
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] rounded-lg" />
          ))}
        </div>
      </div>

      {/* Project Categories Skeleton */}
      <div className="bg-white py-12 border-y">
        <div className="container">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[180px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Project Listings Skeleton */}
      <div className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[350px] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
