'use client';

import { useState } from 'react';
import {
  useIntersectionObserver,
  useIsomorphicLayoutEffect,
} from 'usehooks-ts';

import type { Pokemon, Types } from '@/types/Pokemon';
import { useSearchParams } from 'next/navigation';
import { delay, pokemonsNameStartsWithQuery } from '@/utils/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GridLoader } from 'react-spinners';
import PokemonCard from '../PokemonCard';

const PokemonsList = ({
  pokemons,
  page,
  handlePage,
}: {
  pokemons: Pokemon[] | undefined | null;
  page: number;
  handlePage: (page: number) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';

  const loadNextPage = async () => {
    setLoading(true);
    await delay(1000);
    const nextPage = page + 1;
    handlePage(nextPage);
    setLoading(false);
  };

  useIsomorphicLayoutEffect(() => {
    if (isIntersecting) {
      loadNextPage();
    }
  }, [isIntersecting]);

  const pokemonsFilteredByType =
    type !== 'all'
      ? pokemons?.filter((pokemon) =>
          pokemon.types.some(
            (t: Types) =>
              t.type.name.toLocaleLowerCase() === type.toLocaleLowerCase(),
          ),
        )
      : pokemons;

  const filteredPokemonBySearch = pokemonsFilteredByType!.filter(
    (pokemon: { name: string }) =>
      pokemonsNameStartsWithQuery(pokemon.name, search!.toLowerCase()),
  );

  return (
    <>
      {filteredPokemonBySearch?.length ? (
        <ul
          data-testid="pokemons-list"
          className="container flex w-full flex-wrap items-center justify-center gap-2"
        >
          {filteredPokemonBySearch?.map((pokemon: Pokemon) => (
            <li data-testid="card" key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
        </ul>
      ) : (
        // <div className="flex h-96 items-center justify-center">
        //   <h1 className="text-2xl font-bold text-primary">No Pokemon found!</h1>
        // </div>
        <div className="flex items-center justify-center">
          <GridLoader
            color="#0185d0"
            loading
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {filteredPokemonBySearch && filteredPokemonBySearch.length >= 24 && (
        <div
          data-testid="loader"
          className="flex items-center justify-center pt-8"
          ref={ref}
        >
          <GridLoader
            color="#0185d0"
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default PokemonsList;
