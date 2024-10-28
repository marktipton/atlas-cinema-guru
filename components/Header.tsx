"use client";

import React from 'react';
import { FilmIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

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
      </div>
    )

  }
}
