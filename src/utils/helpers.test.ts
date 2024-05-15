import { BASE_IMAGE_URL } from './constants';
import {
  buildImageSrc,
  pokemonsNameStartsWithQuery,
  capitalizeFirstLetter,
} from './helpers';

describe('helpers', () => {
  describe('buildImageSrc', () => {
    it('should return correct image source', () => {
      const id = 1;
      const expectedSrc = `${BASE_IMAGE_URL}/${id}.png`;
      expect(buildImageSrc(id)).toBe(expectedSrc);
    });
  });

  describe('pokemonsNameStartsWithQuery', () => {
    it('should return true if pokemon name starts with query', () => {
      expect(pokemonsNameStartsWithQuery('pikachu', 'pi')).toBe(true);
    });

    it('should return false if pokemon name does not start with query', () => {
      expect(pokemonsNameStartsWithQuery('pikachu', 'char')).toBe(false);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should return string with first letter capitalized', () => {
      expect(capitalizeFirstLetter('pikachu')).toBe('Pikachu');
    });
  });
});
