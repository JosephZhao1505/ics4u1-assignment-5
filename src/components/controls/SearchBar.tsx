import type { ChangeEvent } from 'react';
import { HiSearch } from 'react-icons/hi';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex flex-1 items-center gap-2">
      <HiSearch className="shrink-0 text-slate-500" />
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full border-none bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:ring-0"
      />
    </div>
  );
};
