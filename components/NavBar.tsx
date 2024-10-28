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
    <nav className='w-48'>
      <h2 className='text-lg font-bold mb-4'>Navigation</h2>
      <ul className='space-y-2'>
        {links.map((link) => (
          <li key={link.href} style={{ marginBottom: '10px' }}>
            <Link
              href={link.href}
              className={`flex items-center gap-2 ${
                pathname === link.href ? 'text-teal' : 'text-white'
              } hover:text-teal`}
            >
              <link.icon className='w-6'/>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;