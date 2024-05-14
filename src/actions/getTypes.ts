'use server';

import { PokemonClient } from 'pokenode-ts';

export async function getTypes() {
  const api = new PokemonClient();
  const data = await api
    .listTypes()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // Handle the error in a different way, e.g. throw an error or log it
      throw error;
    });
  return data;
}
