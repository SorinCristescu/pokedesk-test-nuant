'use server';

import { PokemonClient } from 'pokenode-ts';

export async function getPokemonSpecies({ name }: { name: string }) {
  const api = new PokemonClient();
  const data = await api
    .getPokemonSpeciesByName(name)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  return data;
}
