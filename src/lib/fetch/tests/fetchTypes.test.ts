import { PokemonClient } from 'pokenode-ts';
import { fetchTypes } from '../fetchTypes';

jest.mock('pokenode-ts');

describe('fetchTypes', () => {
  let mockListTypes: jest.Mock;

  beforeEach(() => {
    mockListTypes = jest.fn();
    (PokemonClient as jest.Mock).mockImplementation(() => {
      return {
        listTypes: mockListTypes,
      };
    });
  });

  it('should return data when listTypes is successful', async () => {
    const mockData = ['fire', 'water', 'grass'];
    mockListTypes.mockResolvedValue(mockData);

    const result = await fetchTypes();

    expect(result).toEqual(mockData);
    expect(mockListTypes).toHaveBeenCalled();
  });

  it('should throw an error when listTypes fails', async () => {
    const mockError = new Error('API Error');
    mockListTypes.mockRejectedValue(mockError);

    await expect(fetchTypes()).rejects.toThrow('API Error');
    expect(mockListTypes).toHaveBeenCalled();
  });
});
