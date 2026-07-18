import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full bg-room-cave border-b border-room-rim px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-2.5'>
        <Image
          src="/icons/logo.svg"
          width={28}
          height={28}
          alt='ROOM Logo'
          className='max-sm:size-8'
        />
        <span className='text-xl font-semibold tracking-tight text-room-bone max-sm:hidden'>
          ROOM
        </span>
      </Link>

      <div className='flex items-center gap-4'>
        <SignedIn>
          <UserButton afterSignOutUrl='/sign-in' />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
