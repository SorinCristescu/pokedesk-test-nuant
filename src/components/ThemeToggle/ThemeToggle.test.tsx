import { render, screen } from '@testing-library/react';
import ThemeToggle from '.';

// const mockSetTheme = jest.fn();

// jest.mock('next-themes', () => ({
//   useTheme: () => ({
//     theme: 'light',
//     setTheme: jest.fn(),
//   }),
// }));

describe('Navbar', () => {
  describe('Render', () => {
    it('should render a toggle button', () => {
      render(<ThemeToggle />);

      const toggle = screen.getByTestId('toggle');
      expect(toggle).toBeInTheDocument();
    });
  });

  // describe('Behavior', () => {
  //   it('should call setTheme when toggle clicked', async () => {
  //     render(<ThemeToggle />);

  //     const toggle = screen.getByTestId('toggle');
  //     await userEvent.click(toggle);
  //     expect(mockSetTheme).toHaveBeenCalled();
  //   });
  // });
});
