import { PokemonClient } from 'pokenode-ts';
import { getPokemonSpecies } from '../getPokemonSpecies';

jest.mock('pokenode-ts');

describe('getPokemonSpecies', () => {
  let mockGetPokemonSpeciesByName: jest.Mock;

  beforeEach(() => {
    mockGetPokemonSpeciesByName = jest.fn();
    (PokemonClient as jest.Mock).mockImplementation(() => {
      return {
        getPokemonSpeciesByName: mockGetPokemonSpeciesByName,
      };
    });
  });

  it('should return data when getPokemonSpeciesByName is successful', async () => {
    const mockData = { name: 'pikachu', species: 'mouse pokemon' };
    mockGetPokemonSpeciesByName.mockResolvedValue(mockData);

    const result = await getPokemonSpecies({ name: 'pikachu' });

    expect(result).toEqual(mockData);
    expect(mockGetPokemonSpeciesByName).toHaveBeenCalledWith('pikachu');
  });

  it('should throw an error when getPokemonSpeciesByName fails', async () => {
    const mockError = new Error('API Error');
    mockGetPokemonSpeciesByName.mockRejectedValue(mockError);

    await expect(getPokemonSpecies({ name: 'pikachu' })).rejects.toThrow(
      'API Error',
    );
    expect(mockGetPokemonSpeciesByName).toHaveBeenCalledWith('pikachu');
  });
});
