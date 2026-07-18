'use client';

import React, { useState } from 'react'
import HomeCard from './homeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import Loader from './Loader';
import { Input } from './ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState
    <'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create call');
      const startsAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({ data: { starts_at: startsAt, custom: { description } } });
      setCallDetails(call);
      if (!values.description) router.push(`/meeting/${call.id}`);
      toast({ title: "Meeting created" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting" });
    }
  }

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        accentColor="#E8A84C"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        accentColor="#93C5FD"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        accentColor="#4ADE80"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Past meeting recordings"
        accentColor="#8C7E74"
        handleClick={() => router.push('/recordings')}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5 my-3.5'>
            <label className='text-sm font-medium text-room-ash'>Description</label>
            <Textarea
              className='border-room-rim bg-room-void focus-visible:ring-room-ember focus-visible:ring-1 text-room-bone placeholder:text-room-dusk'
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-2.5 my-3.5'>
            <label className='text-sm font-medium text-room-ash'>Date &amp; Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat="MMMM d, yyyy h:mm aa"
              className='w-full rounded-lg bg-room-void border border-room-rim text-room-bone p-2.5 text-sm focus:outline-none focus:border-room-ember'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Scheduled"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link copied' });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join via link"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Paste meeting link here"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className='border-room-rim bg-room-void text-room-bone placeholder:text-room-dusk focus-visible:ring-room-ember focus-visible:ring-1'
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
