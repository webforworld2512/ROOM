"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setisSetupComplete }: { setisSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)
  const call = useCall()

  if (!call) throw new Error("useCall must be used within StreamCall component")

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-6 bg-room-void text-room-bone px-4'>
      <h1 className='text-2xl font-semibold tracking-tight'>Ready to join?</h1>

      {/* Preview */}
      <div className='w-full max-w-[480px] rounded-2xl overflow-hidden border border-room-rim bg-room-surface'>
        <VideoPreview />
      </div>

      {/* Controls */}
      <div className='flex flex-col items-center gap-4'>
        <label className='flex items-center gap-2.5 cursor-pointer select-none text-sm text-room-ash'>
          <input
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e) => setisMicCamToggledOn(e.target.checked)}
            className='accent-room-ember w-4 h-4 cursor-pointer'
          />
          Join with mic and camera off
        </label>

        <div className='flex items-center gap-3'>
          <DeviceSettings />
          <Button
            className='bg-room-ember text-[#160D00] font-semibold hover:bg-room-cinder px-8 rounded-lg'
            onClick={() => { call.join(); setisSetupComplete(true) }}
          >
            Join Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MeetingSetup
