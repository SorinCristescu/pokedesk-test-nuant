'use client';

import { useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebounceValue, useIsomorphicLayoutEffect } from 'usehooks-ts';
import { DEBOUNCE_TIME } from '@/utils/constants';

const SearchBar: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [debouncedValue, setValue] = useDebounceValue(search, DEBOUNCE_TIME);
  const router = useRouter();
  const pathname = usePathname();
  const initialRender = useRef(true);

  // Hook for scheduling a layout effect with a fallback to a regular effect for
  // environments where layout effects should not be used (such as server-side rendering).
  useIsomorphicLayoutEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!debouncedValue) {
      router.push('/');
    } else {
      const sp = new URLSearchParams(searchParams);
      if (debouncedValue.trim() === '') {
        sp.delete('search');
      } else {
        sp.set('search', debouncedValue);
      }

      router.push(`${pathname}?${sp.toString()}`);
    }
  }, [pathname, debouncedValue, router, searchParams]);

  return (
    <div data-testid="search-bar" className="relative w-full">
      <Input
        data-testid="input"
        type="text"
        className="pl-12"
        placeholder="Search Pokemon..."
        value={debouncedValue}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute left-4 top-0 flex h-full items-center justify-center">
        <SearchIcon
          data-testid="search-icon"
          className="size-5 text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default SearchBar;
