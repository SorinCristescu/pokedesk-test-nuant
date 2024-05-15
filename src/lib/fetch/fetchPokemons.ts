/* eslint-disable no-console */

import { POKEMONS_QUERY_LIMIT, POKEMONS_QUERY_OFFSET } from '@/utils/constants';
import { buildImageSrc } from '@/utils/helpers';
import { PokemonClient } from 'pokenode-ts';

export async function fetchPokemons(page: number) {
  const api = new PokemonClient();
  const offset = (page - 1) * POKEMONS_QUERY_OFFSET;

  try {
    const data = await api
      .listPokemons(offset, POKEMONS_QUERY_LIMIT)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });

    if (data) {
      const pokemonsData = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const pokemonData = await api
            .getPokemonByName(item.name)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              throw error;
            });

          return {
            name: item.name,
            imageSrc: buildImageSrc(pokemonData.id),
            types: pokemonData.types,
          };
        }),
      );

      return pokemonsData;
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return null;
}
