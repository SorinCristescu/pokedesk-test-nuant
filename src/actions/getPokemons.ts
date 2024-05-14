/* eslint-disable no-console */

'use server';

import type { SearchParams } from '@/types/Params';
import {
  POKEMONS_PER_PAGE,
  POKEMONS_QUERY_LIMIT,
  POKEMONS_QUERY_OFFSET,
} from '@/utils/constants';
import { buildImageSrc, pokemonsNameStartsWithQuery } from '@/utils/helpers';
import { PokemonClient } from 'pokenode-ts';

export async function fetchPokemons({
  query,
  page = 1,
}: {
  query?: SearchParams;
  page?: number;
}) {
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

      if (query && query.search) {
        const filteredPokemonBySearch = pokemonsData.filter(
          (pokemon: { name: string }) =>
            pokemonsNameStartsWithQuery(
              pokemon.name,
              query!.search!.toLowerCase(),
            ),
        );
        return filteredPokemonBySearch.slice(0, POKEMONS_PER_PAGE);
      }
      return pokemonsData.slice(0, POKEMONS_PER_PAGE);
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return null;
}

export async function getPokemons({
  page = 1,
  query,
}: {
  page?: number;
  query?: SearchParams;
}) {
  try {
    const pokemonsData = await fetchPokemons({ query, page });
    return pokemonsData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
