import MeetingTypeList from '@/components/meetingTypeList';

const Home = () => {
  const now = new Date();
  const time = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  return (
    <section className='flex size-full flex-col gap-8 text-room-bone'>

      {/* Hero */}
      <div className='relative h-[280px] w-full rounded-2xl overflow-hidden bg-room-cave border border-room-rim'>
        {/* Subtle ember glow */}
        <div className='absolute -top-20 -left-20 w-72 h-72 rounded-full bg-room-ember/5 blur-3xl pointer-events-none' />
        <div className='absolute -bottom-10 right-10 w-48 h-48 rounded-full bg-room-ember/5 blur-2xl pointer-events-none' />

        <div className='relative flex h-full flex-col justify-between p-8 lg:p-11'>
          {/* Upcoming meeting pill */}
          <div className='inline-flex items-center gap-2 rounded-full border border-room-rim bg-room-surface/80 px-3.5 py-1.5 w-fit'>
            <span className='size-1.5 rounded-full bg-room-pulse animate-pulse' />
            <span className='text-sm text-room-ash'>Upcoming meeting at 12:30 PM</span>
          </div>

          {/* Time & date */}
          <div className='flex flex-col gap-1'>
            <h1 className='text-5xl font-semibold tracking-tight text-room-bone lg:text-7xl'>
              {time}
            </h1>
            <p className='text-base font-normal text-room-ash lg:text-xl'>{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
