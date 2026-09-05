// components/property-table-skeleton.tsx
export default function PropertyTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} className="border-b border-[#b6b3b3] animate-pulse">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 w-32 rounded" />
                <div className="h-3 bg-gray-100 w-20 rounded" />
              </div>
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 w-24 rounded" />
            <div className="h-3 bg-gray-100 w-16 mt-1 rounded" />
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 w-20 rounded" />
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 w-16 rounded" />
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-200 w-12 rounded" />
          </td>
          <td className="px-4 py-3 text-right">
            <div className="h-4 bg-gray-200 w-6 rounded ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}
