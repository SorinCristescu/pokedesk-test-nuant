'use client';

import { useState } from 'react';
import {
  useIntersectionObserver,
  useIsomorphicLayoutEffect,
} from 'usehooks-ts';
import type { Pokemon } from '@/types/Pokemon';
import { GridLoader } from 'react-spinners';

const PokemonsList = ({
  initialPokemons,
}: {
  initialPokemons: Pokemon[] | undefined | null;
}) => {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  const loadMorePokemons = async () => {
    setPokemons([]);
  };

  useIsomorphicLayoutEffect(() => {
    if (isIntersecting) {
      loadMorePokemons();
    }
  }, [isIntersecting]);

  return (
    <>
      <pre>count: {pokemons?.length}</pre>
      <pre>{JSON.stringify(pokemons, null, 2)}</pre>
      {!pokemons && (
        <div
          data-testid="loader"
          className="flex items-center justify-center p-8"
          ref={ref}
        >
          <GridLoader
            color="#0185d0"
            // loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default PokemonsList;
