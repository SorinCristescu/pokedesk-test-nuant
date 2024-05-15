import { PokemonClient } from 'pokenode-ts';
import { getPokemon } from '../getPokemon';

jest.mock('pokenode-ts');

describe('getPokemon', () => {
  let mockGetPokemonByName: jest.Mock;

  beforeEach(() => {
    mockGetPokemonByName = jest.fn();
    (PokemonClient as jest.Mock).mockImplementation(() => {
      return {
        getPokemonByName: mockGetPokemonByName,
      };
    });
  });

  it('should return data when getPokemonByName is successful', async () => {
    const mockData = { name: 'pikachu', type: 'electric' };
    mockGetPokemonByName.mockResolvedValue(mockData);

    const result = await getPokemon({ name: 'pikachu' });

    expect(result).toEqual(mockData);
    expect(mockGetPokemonByName).toHaveBeenCalledWith('pikachu');
  });

  it('should throw an error when getPokemonByName fails', async () => {
    const mockError = new Error('API Error');
    mockGetPokemonByName.mockRejectedValue(mockError);

    await expect(getPokemon({ name: 'pikachu' })).rejects.toThrow('API Error');
    expect(mockGetPokemonByName).toHaveBeenCalledWith('pikachu');
  });
});
