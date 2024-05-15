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
  const type = searchParams.get('type') || 'all';

  const handleChange = (value: string) => {
    const sp = new URLSearchParams(searchParams);
    if (value === 'all') {
      sp.delete('type');
    } else {
      sp.set('type', value);
    }
    router.push(`/?${sp.toString()}`);
  };

  return (
    <Select
      data-testid="filter"
      onValueChange={handleChange}
      defaultValue={type}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem data-testid="select-item" value="all">
          All
        </SelectItem>

        {types &&
          types.map((t) => (
            <SelectItem data-testid="select-item" key={t.url} value={t.name}>
              {capitalizeFirstLetter(t.name)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;
