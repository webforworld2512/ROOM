import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type CallLayoutType = "grid | spealer-left | speaker-right";

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('Personal');
    const [layout, setLayout] = useState("speaker-left");
    const [showParticipants, setShowParticipants] = useState(false);
    const router = useRouter();
    const call = useCall();
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return 
    <Loader />

    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }

    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-room-bone bg-room-void'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                <div className={cn('h-[calc(100vh-86px)] hidden ml-2',
                    { "show-block": showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className='fixed bottom-0 flex w-full items-center justify-center gap-4 pb-4 flex-wrap'>
                <CallControls onLeave={async () => {
                    await call?.camera.disable();
                    await call?.microphone.disable();
                    router.push('/');
                }} />

                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger className='cursor-pointer rounded-xl bg-room-cave border border-room-rim px-4 py-2 hover:bg-room-surface transition-colors'>
                            <LayoutList size={18} className='text-room-ash' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-room-rim bg-room-surface text-room-bone'>
                        {['Grid', 'Speaker-left', 'Speaker-right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem
                                    className='cursor-pointer hover:text-room-bone focus:text-room-bone focus:bg-room-rim'
                                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                >
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                        <DropdownMenuSeparator className='bg-room-rim' />
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className='cursor-pointer rounded-xl bg-room-cave border border-room-rim px-4 py-2 hover:bg-room-surface transition-colors'
                >
                    <Users size={18} className='text-room-ash' />
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}

export default MeetingRoom