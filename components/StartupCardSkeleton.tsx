// components/StartupCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function StartupCardSkeleton() {
  return (
    <div className="rounded-xl p-4 border shadow-sm bg-white">
      <Skeleton className="h-40 w-full rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
