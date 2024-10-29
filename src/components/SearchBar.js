// src/components/SearchBar.js
import React from 'react';

function SearchBar({ query, setQuery, handleSearch }) {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search media..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
