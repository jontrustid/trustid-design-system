import { useState } from 'react';
import SearchField from '../../blocks/forms/SearchField';

export default function SearchFieldDemo() {
  const [query, setQuery] = useState('container');
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <SearchField
        aria-label="Search"
        placeholder="Search applications"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
      />
      <SearchField
        label="Compact"
        size="sm"
        placeholder="Labelled small search"
        hint="Renders a clear button while the value is non-empty"
      />
    </div>
  );
}
