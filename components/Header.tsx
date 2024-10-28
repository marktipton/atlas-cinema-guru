import React from 'react';
import { FilmIcon } from "@heroicons/react/24/outline"


export const Header = () => {
  return (
    <div className='bg-teal h-10 text-searchBlue flex'>
      <FilmIcon />
      <span className='text-xl font-bold'>Cinema Guru</span>
    </div>
  )
}
