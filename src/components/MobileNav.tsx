'use client'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '../../constants'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={32}
            height={32}
            alt="menu"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className='border-r border-room-rim bg-room-cave'>
          <Link href="/" className='flex items-center gap-2.5 mb-8'>
            <Image src="/icons/logo.svg" width={28} height={28} alt='ROOM Logo' />
            <span className='text-xl font-semibold tracking-tight text-room-bone'>ROOM</span>
          </Link>
          <div className='flex flex-col gap-1'>
            <SheetClose asChild>
              <section className='flex flex-col gap-1'>
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        className={cn(
                          'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full',
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
                          width={18}
                          height={18}
                          className={cn('opacity-60', isActive && 'opacity-100')}
                        />
                        <p className='text-sm font-medium'>{link.label}</p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
