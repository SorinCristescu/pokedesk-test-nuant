'use client';

import { useState, type SetStateAction } from 'react';
import Filter from '@/components/Filter';
import PokemonsList from '@/components/PokemonsList';
import SearchBar from '@/components/Search';
import type { Pokemon } from '@/types/Pokemon';
import type { NamedAPIResourceList } from 'pokenode-ts';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { fetchPokemons } from '@/lib/fetch/fetchPokemons';
import { fetchTypes } from '@/lib/fetch/fetchTypes';
import { GridLoader } from 'react-spinners';

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>([]);
  const [types, setTypes] = useState<NamedAPIResourceList | []>([]);
  const [page, setPage] = useState(1);

  const getPokemons = async () => {
    const result = await fetchPokemons(page);
    setPokemons(result);
  };

  const getTypes = async () => {
    const result = await fetchTypes();
    setTypes(result);
  };

  useIsomorphicLayoutEffect(() => {
    getPokemons();
    getTypes();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const loadMorePokemons = async () => {
      const newPokemons = await fetchPokemons(page);
      setPokemons(
        (prev: SetStateAction<SetStateAction<[] | Pokemon[] | null>>) => {
          if (!prev) return newPokemons;
          // prevent duplicates
          const uniquePokemons = newPokemons!.filter((pokemon: Pokemon) => {
            if (Array.isArray(prev)) {
              return !prev.some((p) => p.name === pokemon.name);
            }
            return false;
          });
          return [...(Array.isArray(prev) ? prev : []), ...uniquePokemons];
        },
      );
    };

    loadMorePokemons();
  }, [page]);

  return (
    <main
      data-testid="home-page"
      className="container relative flex min-h-screen flex-col items-center py-24"
    >
      <section className="container fixed top-20 z-10 flex w-full flex-col items-start justify-center gap-2 bg-background py-4">
        <div className="flex w-full flex-col items-start justify-center gap-4 bg-background md:flex-row">
          <SearchBar />
          {Array.isArray(types) ? null : <Filter types={types.results} />}
        </div>
      </section>
      <section key={Math.random()} className="mt-32 py-4 lg:mt-20">
        {pokemons === null ? (
          <div className="flex items-center justify-center">
            <GridLoader
              color="#0185d0"
              loading
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <PokemonsList pokemons={pokemons} page={page} handlePage={setPage} />
        )}
      </section>
    </main>
  );
}
