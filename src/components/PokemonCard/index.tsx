'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Pokemon } from '@/types/Pokemon';
import { capitalizeFirstLetter } from '@/utils/helpers';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }): React.JSX.Element => {
  const router = useRouter();
  const handleClick = (): void => router.push(`/pokemon/${pokemon.name}`);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus, jsx-a11y/no-static-element-interactions
    <div
      data-testid="card"
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className="m-5 flex h-fit w-56 flex-col items-center justify-start rounded-2xl bg-neutral-200 bg-opacity-50 p-4 shadow-md shadow-neutral-300 backdrop-blur-sm dark:bg-neutral-700 dark:bg-opacity-50 dark:shadow-neutral-700"
      onClick={handleClick}
    >
      <h1
        data-testid="card-label"
        className="w-11/12 truncate text-center text-xl font-extrabold text-primary"
      >
        {capitalizeFirstLetter(pokemon.name)}
      </h1>
      <div className="relative size-48">
        <Image
          data-testid="card-image"
          src={pokemon.imageSrc}
          alt={pokemon.name}
          fill
          style={{
            objectFit: 'cover',
          }}
          className="mb-4 cursor-pointer"
          priority
        />
      </div>
    </div>
  );
};

export default PokemonCard;
