import { BASE_IMAGE_URL } from './constants';

export function buildImageSrc(id: number) {
  const src = `${BASE_IMAGE_URL}/${id}.png`;
  return src;
}

export function pokemonsNameStartsWithQuery(name: string, query: string) {
  return name.toLowerCase().startsWith(query);
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
