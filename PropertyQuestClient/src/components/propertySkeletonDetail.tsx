"use client";

export default function PropertySkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Back Navigation */}
      <div className="bg-white px-4 sm:px-6">
        <div className="max-w-6xl mx-auto py-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white border-b border-[#b6b3b3] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* Left: Title & Address */}
            <div className="space-y-2">
              <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Right: Price & Actions */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="h-8 w-28 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-[250px] sm:h-[300px] bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-[50px] bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-[250px] bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-[100px] bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#b6b3b3] space-y-6">
              {/* Agent Info */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Contact Form */}
              <div className="space-y-3 border-t pt-4 border-[#b6b3b3]">
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-20 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
