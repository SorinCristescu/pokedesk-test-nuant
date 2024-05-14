import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './index';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Filter', () => {
  it('renders correctly', async () => {
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    const types = [
      { name: 'type1', url: 'url1' },
      { name: 'type2', url: 'url2' },
    ];

    render(<Filter types={types} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('combobox')); // Click the SelectTrigger
  });
});
