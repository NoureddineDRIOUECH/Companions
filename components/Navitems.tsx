'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const navItems = [{
            label: 'Home',
            href: '/'
        },
        {
            label: 'Companions',
            href: '/companions'
        },
        {
            label: 'My journey',
            href: '/my-journey'
        }]
export const NavItems = () => {
    const pathname = usePathname();
  return ( 
    <nav className='flex items-center gap-4'>
        {navItems.map(({label, href}) => (
            <Link 
            className={cn(pathname === href && 'text-primary font-semibold')} 
            href={href} 
            key={label}>
                {label}
                </Link>
        ))}
    </nav>
  )
}
