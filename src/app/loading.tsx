import { Skeleton } from '@/components/ui/skeleton';
import { POKEMONS_PER_PAGE } from '@/utils/constants';

export default function Loading() {
  return (
    <main className="container relative flex min-h-screen flex-col items-center py-24">
      <section className="container fixed top-24 z-10 flex w-full flex-col items-start justify-center gap-4 py-4 md:flex-row">
        <Skeleton className="h-10 w-full bg-slate-300 dark:bg-slate-800 " />
        <Skeleton className="h-10 w-[180px] bg-slate-300 dark:bg-slate-800 " />
      </section>
      <div className="container mt-24 flex w-full flex-wrap items-center justify-center gap-2 py-4">
        {[...Array(POKEMONS_PER_PAGE)].map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="m-5 flex h-fit w-56 flex-col items-center justify-start rounded-2xl border-2 border-slate-300  p-4  dark:border-slate-800"
          >
            <Skeleton className="h-4 w-11/12  bg-slate-300 dark:bg-slate-800" />
            <div className="size-48 p-8">
              <Skeleton className="size-full rounded-full  bg-slate-300 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
