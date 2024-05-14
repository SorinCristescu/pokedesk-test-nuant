import { fireEvent, render, screen } from '@testing-library/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounceValue } from 'usehooks-ts';
import SearchBar from '.';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('usehooks-ts', () => ({
  useDebounceValue: jest.fn(),
  useIsomorphicLayoutEffect: jest.fn(),
}));

describe('Search', () => {
  describe('Render', () => {
    it('renders correctly', () => {
      const mockSearchParams = new URLSearchParams();
      (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
      (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
      (usePathname as jest.Mock).mockReturnValue('/');
      (useDebounceValue as jest.Mock).mockReturnValue(['', jest.fn()]);

      render(<SearchBar />);

      expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('updates search value on input change', () => {
      const mockSearchParams = new URLSearchParams();
      const mockSetValue = jest.fn();
      (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
      (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
      (usePathname as jest.Mock).mockReturnValue('/');
      (useDebounceValue as jest.Mock).mockReturnValue(['', mockSetValue]);

      render(<SearchBar />);

      fireEvent.change(screen.getByTestId('input'), {
        target: { value: 'Pikachu' },
      });

      expect(mockSetValue).toHaveBeenCalledWith('Pikachu');
    });
  });
});
