'use client';

import { useState } from 'react';
import { getPokemons } from '@/actions/getPokemons';
import {
  useIntersectionObserver,
  useIsomorphicLayoutEffect,
} from 'usehooks-ts';

import type { Pokemon, Types } from '@/types/Pokemon';
import { useSearchParams } from 'next/navigation';
import { delay } from '@/utils/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GridLoader } from 'react-spinners';
import PokemonCard from '../PokemonCard';
import { DEBOUNCE_TIME } from '@/utils/constants';

const PokemonsList = ({
  initialPokemons,
}: {
  initialPokemons: Pokemon[] | undefined | null;
}) => {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';

  const loadMorePokemons = async () => {
    setLoading(true);
    await delay(DEBOUNCE_TIME);
    const nextPage = page + 1;
    const newPokemons = await getPokemons({
      query: {
        search,
      },
      page: nextPage,
    });
    setPage(nextPage);
    setPokemons((prev) => {
      if (!prev) return newPokemons;
      const uniquePokemons = newPokemons!.filter(
        (pokemon: Pokemon) => !prev.some((p) => p.name === pokemon.name),
      );
      return [...prev, ...uniquePokemons];
    });
    setLoading(false);
  };

  useIsomorphicLayoutEffect(() => {
    if (isIntersecting) {
      loadMorePokemons();
    }
  }, [isIntersecting]);

  const pokemonsFilteredByType =
    type !== ''
      ? pokemons?.filter((pokemon) =>
          pokemon.types.some(
            (t: Types) =>
              t.type.name.toLocaleLowerCase() === type.toLocaleLowerCase(),
          ),
        )
      : pokemons;

  return (
    <>
      <pre className="fixed top-36 z-10 text-xs">
        count: {pokemonsFilteredByType?.length || 0}
      </pre>
      {pokemonsFilteredByType?.length ? (
        <ul
          data-testid="pokemons-list"
          className="container flex w-full flex-wrap items-center justify-center gap-2"
        >
          {pokemonsFilteredByType?.map((pokemon: Pokemon) => (
            <li data-testid="card" key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <h1 className="text-2xl font-bold text-primary">No Pokemon found!</h1>
        </div>
      )}

      {pokemonsFilteredByType && pokemonsFilteredByType.length >= 24 && (
        <div
          data-testid="loader"
          className="flex items-center justify-center p-8"
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
