import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className="container relative flex min-h-screen flex-col items-center justify-center pt-[120px] lg:pt-0">
      <Skeleton className="mb-2 h-12 w-full lg:lg:w-1/3" />
      <Skeleton className="mb-2 h-8 w-full lg:lg:w-1/2" />
      <Skeleton className="mb-4 h-8 w-full lg:lg:w-1/2" />
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:items-center md:justify-around">
        <div className="size-[350px]">
          <Skeleton className="size-full rounded-full" />
        </div>

        <div className="flex flex-col items-end justify-center space-y-2 lg:space-y-4">
          {[...Array(6)].map((_, i: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="flex items-center justify-center gap-2">
              <Skeleton className="h-2 w-[120px]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
