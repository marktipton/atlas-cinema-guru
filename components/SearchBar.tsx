import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <div className='flex justify-between items-start w-full'>
      <div className='flex flex-col items-start justify-between'>
        <div>
          <div>
            Search
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search Movies...'
            className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full'
          />
        </div>
        <div className='flex'>
          <div>
            Min Year
          </div>
          <input
              type="number"
              placeholder=''
              className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full'
          />
          <div>
            Max Year
          </div>
          <input
            type="text"
            placeholder=''
            className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full'
          />
        </div>
      </div>
      <div>
        Genres
      </div>
    </div>
  )
}

export default SearchBar