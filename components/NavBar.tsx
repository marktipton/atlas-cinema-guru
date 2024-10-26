"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname
  const links = [
    { href: '/', label: 'Home' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/watch-later', label: 'Watch Later' },
  ];

  return (
    <nav style={{ width: '200px', background: '#333', color: '#fff', padding: '20px' }}>
      <h2>Navigation</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {links.map((link) => (
          <li key={link.href} style={{ marginBottom: '10px' }}>
            <Link href={link.href} style={{ color: pathname === link.href ? 'yellow' : 'white' }}>
                {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;