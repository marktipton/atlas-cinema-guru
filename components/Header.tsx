"use client";

import React from 'react';
import { FilmIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='bg-teal h-14 text-searchBlue flex items-center justify-between'>
        <div className='flex items-center gap-1 ml-4'>
          <FilmIcon className='w-5 h-5'/>
          <div className='text-xl font-bold'>Cinema Guru</div>
        </div>
        <div className='flex gap-3 mr-4'>
          <div>
            {`Hello, ${session.user?.email}`}
          </div>
          <div>
            <button
              onClick={() => signOut()}
              className='flex items-center gap-1'
            >
              <ArrowRightStartOnRectangleIcon className='w-5 h-5'/>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    )

  }
}
