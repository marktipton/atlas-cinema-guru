"use client";

import React from 'react';
import { FilmIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='bg-teal h-10 text-searchBlue flex'>
        <FilmIcon />
        <span className='text-xl font-bold'>Cinema Guru</span>
        <div>
          {`Hello, ${session.user?.email}`}
        </div>
        <button
          onClick={() => signOut()}
          className='h-10 flex'
        >
          <ArrowRightStartOnRectangleIcon className='w-5 h-5'/>
          <span>Logout</span>
        </button>
      </div>
    )

  }
}
