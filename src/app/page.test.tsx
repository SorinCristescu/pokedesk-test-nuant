import { render, screen } from '@testing-library/react';

import Home from './page';

async function resolvedComponent(Component: any, props?: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('Index page', () => {
  describe('Render method', () => {
    it('should have h1 tag', async () => {
      const HomeResolved = await resolvedComponent(Home);
      render(<HomeResolved />);

      const heading = screen.getByRole('heading', {
        name: /Pokedesk/,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
