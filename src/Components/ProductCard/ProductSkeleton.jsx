
export default function ProductSkeleton() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-40 sm:h-44 w-full bg-gray-200" />

      {/* Content Skeleton */}
      <div className="px-2 py-3 space-y-3">
        {/* Title */}
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />

        {/* Hindi Title */}
        <div className="h-4 bg-gray-200 rounded w-16" />

        {/* Order Button + Qty */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-14" />
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
            <div className="h-3 w-4 bg-gray-200 rounded" />
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
