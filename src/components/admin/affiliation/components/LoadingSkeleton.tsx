import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-12" />
        </Card>
      ))}
    </div>
  );
};