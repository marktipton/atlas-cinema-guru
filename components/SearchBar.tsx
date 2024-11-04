import React, { useState } from 'react';
import Genres from './Genres';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <div className='flex justify-between items-start w-full pb-4'>
      <div className='flex flex-col items-start justify-between w-1/4'>
        <div className='w-full'>
          <div className='flex-grow'>
            Search
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search Movies...'
            className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
          />
        </div>
        <div className='flex gap-4 mt-2 w-full'>
          <div className='flex-grow'>
            <div>
              Min Year
            </div>
            <input
                type="number"
                placeholder=''
                className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
            />
          </div>
          <div className='flex-grow'>
            <div>
              Max Year
            </div>
            <input
              type="number"
              placeholder=''
              className='bg-searchBlue outline outline-2 p-2 outline-teal rounded-full w-full'
            />
          </div>
        </div>
      </div>
      <div className='w-4/12'>
        <Genres/>
      </div>
    </div>
  )
}

export default SearchBar