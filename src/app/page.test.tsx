import { render, screen } from '@testing-library/react';

import Home from './page';

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', () => {
      render(<Home />);

      const heading = screen.getByRole('heading', {
        name: /Pokedesk/,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
