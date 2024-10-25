// src/components/SearchBar.js
import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search media..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
