"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClockIcon , FolderIcon, StarIcon } from "@heroicons/react/24/solid"

const NavBar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname
  const links = [
    { href: '/', label: 'Home', icon: FolderIcon},
    { href: '/favorites', label: 'Favorites', icon: StarIcon},
    { href: '/watch-later', label: 'Watch Later', icon: ClockIcon },
  ];

  return (
      <nav
        className='group h-full flex flex-col bg-darkTeal transition-all duration-300 w-16 hover:w-48'
      >
        {/* <h2 className='text-lg font-bold mb-4'>Navigation</h2> */}
        <ul className='space-y-2 mt-4'>
          {links.map((link) => (
            <li key={link.href} className='flex items-center'>
              <Link
                href={link.href}
                className={`flex items-center gap-2 p-2 pl-4 rounded-md ${
                  pathname === link.href ? 'text-searchBlue' : 'text-white'
                } hover:text-searchBlue transition-all duration-300`}
              >
                <link.icon className='w-6 h-6'/>
                <span className='absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2'>
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

  );
};

export default NavBar;