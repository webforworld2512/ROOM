import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
  img: string
  title: string
  description: string
  handleClick: () => void
  accentColor: string
  className?: string
}

const HomeCard = ({ img, title, description, handleClick, accentColor, className }: HomeCardProps) => {
  return (
    <div
      className={cn(
        'relative bg-room-surface border border-room-rim px-5 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[240px] rounded-[14px] cursor-pointer overflow-hidden transition-colors hover:border-room-dusk',
        className
      )}
      onClick={handleClick}
    >
      {/* Accent top bar */}
      <div className='absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px]' style={{ background: accentColor }} />

      {/* Icon container */}
      <div
        className='size-12 rounded-[10px] flex items-center justify-center'
        style={{ background: accentColor + '22' }}
      >
        <Image src={img} alt={title} width={24} height={24} />
      </div>

      {/* Text */}
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-lg font-semibold tracking-tight text-room-bone'>{title}</h1>
        <p className='text-sm text-room-ash'>{description}</p>
      </div>
    </div>
  )
}

export default HomeCard
