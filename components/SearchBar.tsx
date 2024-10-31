import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <div>
        <div>
          Search
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder=' Search Movies...'
          className='bg-searchBlue outline outline-2 outline-teal rounded-full'
        />
        <div>
          <div>
            Min Year
          </div>
          <div>
            Max Year
          </div>
        </div>
      </div>
      <div>
        Genres
      </div>
    </div>
  )
}

export default SearchBar