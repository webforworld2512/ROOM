'use client'
import React from 'react'
import { sidebarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-room-cave border-r border-room-rim p-4 pt-28 max-sm:hidden lg:w-[240px]'>
      <div className='flex flex-col gap-1'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-room-surface text-room-bone'
                  : 'text-room-ash hover:text-room-bone hover:bg-room-surface/50'
              )}
            >
              {isActive && (
                <span className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-room-ember rounded-r-full' />
              )}
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={20}
                height={20}
                className={cn('opacity-60', isActive && 'opacity-100')}
              />
              <p className={cn('text-sm font-medium max-lg:hidden', isActive && 'text-room-bone')}>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar
