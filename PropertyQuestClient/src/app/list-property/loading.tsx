import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div>
          <Skeleton className="h-8 w-1/2 mb-6" />
          <div className="space-y-6">
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 mr-3 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 mr-3 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 mr-3 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
        <div className="mb-6">
          <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>

        <Skeleton className="h-80 w-full mb-6" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
