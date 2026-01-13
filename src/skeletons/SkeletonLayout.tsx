import Skeleton from "@/components/Skeleton";

export default function SkeletonLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-14 w-60 p-4 space-y-4 bg-white dark:bg-zinc-900">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-6" />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 w-full h-16 px-6 flex items-center justify-between border-b bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>

          <Skeleton className="h-8 w-full max-w-lg m-auto rounded-full" />

          <div className="w-60 flex items-center gap-2">

            <Skeleton className="size-8" />

            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-6" />
            ))}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    </div>
  );
}
