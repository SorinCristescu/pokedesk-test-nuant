import { getPokemons } from '@/actions/getPokemons';
import { getTypes } from '@/actions/getTypes';
import Filter from '@/components/Filter';
import PokemonsList from '@/components/PokemonsList';
import SearchBar from '@/components/Search';
import type { SearchParams } from '@/types/Params';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const pokemons = await getPokemons({ query: searchParams });
  const types = await getTypes();

  return (
    <main
      data-testid="home-page"
      className="container relative flex min-h-screen flex-col items-center py-24"
    >
      <section className="container fixed top-24 z-10 flex w-full flex-col items-start justify-center gap-4 bg-background py-4 md:flex-row">
        <SearchBar />
        <Filter types={types.results} />
      </section>
      <section className="mt-20 py-4">
        <PokemonsList initialPokemons={pokemons} />
      </section>
    </main>
  );
}
