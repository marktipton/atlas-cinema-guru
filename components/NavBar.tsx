"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderIcon } from "@heroicons/react/24/outline"

const NavBar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname
  const links = [
    { href: '/', label: 'Home', icon: {FolderIcon}},
    { href: '/favorites', label: 'Favorites' },
    { href: '/watch-later', label: 'Watch Later' },
  ];

  return (
    <nav className='w-48'>
      <h2 className='text-lg font-bold mb-4'>Navigation</h2>
      <ul className='space-y-2'>
        {links.map((link) => (
          <li key={link.href} style={{ marginBottom: '10px' }}>
            <Link href={link.href}
                  className={`${
                  pathname === link.href ? 'text-yellow-400' : 'text-white'
                } hover:text-yellow-400`}
            >
              <FolderIcon className='w-10'/>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;