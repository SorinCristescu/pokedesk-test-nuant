'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Type } from '@/types/Pokemon';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterProps {
  types: Type[];
}

const Filter: React.FC<FilterProps> = ({ types }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    if (value === 'all') {
      const sp = new URLSearchParams(searchParams);
      sp.delete('type');
      router.push(`/?${sp.toString()}`);
      return;
    }

    const sp = new URLSearchParams(searchParams);
    sp.set('type', value);
    router.push(`/?${sp.toString()}`);
  };

  return (
    <Select data-testid="filter" onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-testid="select-item" value="all">
          All
        </SelectItem>
        {types &&
          types.map((type) => (
            <SelectItem
              data-testid="select-item"
              key={type.url}
              value={type.name ? type.name : ''}
            >
              {capitalizeFirstLetter(type.name)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
