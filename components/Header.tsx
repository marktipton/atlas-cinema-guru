"use client";

import React from 'react';
import { FilmIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='bg-teal h-10 text-searchBlue flex items-center'>
        <FilmIcon className='w-5 h-5'/>
        <span className='text-xl font-bold'>Cinema Guru</span>
        <div>
          {`Hello, ${session.user?.email}`}
        </div>
        <div>
          <button
            onClick={() => signOut()}
            className='flex items-center'
          >
            <ArrowRightStartOnRectangleIcon className='w-5 h-5'/>
            <span>Logout</span>
          </button>

        </div>
      </div>
    )

  }
}
