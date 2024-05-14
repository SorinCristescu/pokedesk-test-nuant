'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { Button } from '../ui/button';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme === 'light' || theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark' || theme === 'system') {
      setTheme('light');
    }
  };

  return (
    <Button
      data-testid="toggle"
      variant="ghost"
      onClick={handleTheme}
      className="size-12 rounded-full"
    >
      {theme === 'light' ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  );
}
