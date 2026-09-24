'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import DishCard from './DishCard';
import Reveal from './Reveal';
import { items } from '@/lib/menu-data';

// Shared search bar. Uses the same `.search` styling as the original home
// page bar (see globals.css) — the input is transparent and inherits the
// container's font/colour so it looks identical to the old static div.
//
// Typing filters dishes across the whole menu (not just the current
// cuisine) and shows the matches right under the bar, reusing DishCard so
// add-to-cart works from the results.
export default function SearchBar() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => i.name.toLowerCase().includes(q)) : [];

  return (
    <>
      <label className="search">
        <Search size={16} />
        <input
          type="search"
          className="search-input"
          placeholder="Search dishes, drinks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search dishes and drinks"
        />
      </label>
      {q && (
        results.length > 0 ? (
          <div className="grid search-results">
            {results.map((item, i) => (
              <Reveal key={item.id} index={i}>
                <DishCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state search-results">No matches for “{query.trim()}”.</div>
        )
      )}
    </>
  );
}
