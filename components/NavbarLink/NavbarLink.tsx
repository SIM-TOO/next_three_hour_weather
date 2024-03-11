'use client'
import { ubuntuBold } from '@/fonts/ubunfu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface INavbarLinkPorps {
  href: string;
  children: string;
}

const NavbarLink = ({ href, children: text }: INavbarLinkPorps) => {

  const path = usePathname();
  console.log(path);
  const isCurrentPage = path === href;

  return (
    <li className=''>
      <Link
        href={href}
        className={`
        navbar__link p-1 text-[1.17em]
      ${isCurrentPage ? 'text-[var(--sky-color)]' : 'text-black'}
     hover:text-[var(--sky-color)] transition-all duration-500 ease-out
     ${ubuntuBold.className}
      `}>
        {text}
      </Link>
    </li>
  )
}

export default NavbarLink