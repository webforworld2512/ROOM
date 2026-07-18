"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { avatarImages } from "../../constants";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon, title, date, isPreviousMeeting,
  buttonIcon1, handleClick, link, buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className='flex min-h-[220px] w-full flex-col justify-between rounded-2xl bg-room-surface border border-room-rim px-5 py-6 xl:max-w-[568px]'>
      <article className='flex flex-col gap-4'>
        <Image src={icon} alt="meeting type" width={24} height={24} className='opacity-70' />
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold tracking-tight text-room-bone'>{title}</h1>
          <p className='text-sm text-room-ash'>{date}</p>
        </div>
      </article>

      <article className={cn("flex justify-between items-center", {})}>
        <div className='relative flex max-sm:hidden'>
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendee"
              width={36}
              height={36}
              className={cn('rounded-full border-2 border-room-surface', { 'absolute': index > 0 })}
              style={{ top: 0, left: index * 24 }}
            />
          ))}
          <div className='flex-center absolute size-9 rounded-full border-2 border-room-surface bg-room-rim text-xs text-room-ash' style={{ left: avatarImages.length * 24 }}>
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className='flex gap-2'>
            <Button
              onClick={handleClick}
              className='bg-room-ember text-[#160D00] font-semibold hover:bg-room-cinder px-5 rounded-lg'
            >
              {buttonIcon1 && <Image src={buttonIcon1} alt="action" width={16} height={16} className='mr-1' />}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({ title: "Link copied" });
              }}
              className='bg-room-rim text-room-ash hover:bg-room-dusk hover:text-room-bone px-5 rounded-lg'
            >
              <Image src="/icons/copy.svg" alt="copy" width={16} height={16} className='mr-1' />
              Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
