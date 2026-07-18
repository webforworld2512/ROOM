import React, { ReactNode } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  handleClick?: () => void
  children?: ReactNode
  buttonText?: string
  image?: string
  buttonIcon?: string
}

const MeetingModal = ({
  isOpen, onClose, title, className, handleClick,
  children, buttonText, image, buttonIcon
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex w-full max-w-[480px] flex-col gap-6 border border-room-rim bg-room-surface px-6 py-8 text-room-bone'>
        <div className='flex flex-col gap-5'>
          {image && (
            <div className='flex justify-center'>
              <Image src={image} alt="modal icon" width={60} height={60} />
            </div>
          )}
          <h1 className={cn('text-2xl font-semibold tracking-tight text-room-bone', className)}>
            {title}
          </h1>
          {children}
          <Button
            className='w-full bg-room-ember text-[#160D00] font-semibold hover:bg-room-cinder focus-visible:ring-room-ember'
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="button icon" width={14} height={14} className='mr-1' />
            )}
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
