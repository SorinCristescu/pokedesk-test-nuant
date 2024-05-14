import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import PokemonCard from './index';
import type { Pokemon } from '@/types/Pokemon';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PokemonCard', () => {
  it('renders correctly', () => {
    const pokemon: Pokemon = {
      name: 'pikachu',
      imageSrc: '/path/to/image.jpg',
      types: [],
    };

    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-label')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('card-image')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fpath%2Fto%2Fimage.jpg&w=3840&q=75',
    );
  });

  it('navigates to the correct page when clicked', () => {
    const pokemon: Pokemon = {
      name: 'pikachu',
      imageSrc: '/path/to/image.jpg',
      types: [],
    };

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByTestId('card'));

    expect(mockPush).toHaveBeenCalledWith('/pokemon/pikachu');
  });
});
