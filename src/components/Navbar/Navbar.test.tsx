import { render, screen } from '@testing-library/react';
import { Navbar } from '.';

describe('Navbar', () => {
  describe('Render', () => {
    it('should render a header', () => {
      render(<Navbar />);

      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });

    it('should render a logo', () => {
      render(<Navbar />);

      const logo = screen.getByAltText('Pokedesk logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render theme toggle', () => {
      render(<Navbar />);

      const toggle = screen.getByTestId('toggle');
      expect(toggle).toBeInTheDocument();
    });
  });
});
