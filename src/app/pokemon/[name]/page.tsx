import { getPokemon } from '@/actions/getPokemon';
import { getPokemonSpecies } from '@/actions/getPokemonSpecies';
import { buildImageSrc, capitalizeFirstLetter } from '@/utils/helpers';
import { Progress } from '@/components/ui/progress';

import Image from 'next/image';

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemon({ name: params.name });
  const species = await getPokemonSpecies({ name: params.name });

  return (
    <main className="container relative flex h-full min-h-screen flex-col items-center justify-center pt-[150px]">
      <h1 data-testid="title" className="mb-4 text-5xl font-bold text-primary">
        {capitalizeFirstLetter(pokemon.name)}
      </h1>
      <p
        data-testid="description"
        className="text-center text-xl text-muted-foreground lg:w-1/2 "
      >
        {species.flavor_text_entries[0]!.flavor_text}
      </p>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:items-center md:justify-around">
        <div className="relative size-[350px] lg:size-[500px]">
          <Image
            src={buildImageSrc(pokemon.id)}
            alt={pokemon.name}
            fill
            style={{
              objectFit: 'contain', // cover, contain, none
            }}
            priority
          />
        </div>

        <div className="flex flex-col items-end justify-center space-y-2 lg:space-y-4">
          {pokemon.stats.map((stat) => (
            <div
              key={stat.stat.name}
              className="flex items-center justify-between space-x-2 text-sm lg:text-[16px]"
            >
              <p>{capitalizeFirstLetter(stat.stat.name)}</p>
              <Progress
                value={stat.base_stat}
                className="h-2 w-[120px] md:w-[300px]"
              />
              <p className="w-[50px]">{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
