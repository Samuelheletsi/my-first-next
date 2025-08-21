import React from 'react'

const Ping = () => {
  return (
    <div className='relative'>
         <div className="absolute -left-4 top-1">
            <span className='flex size[11px]'>
                <span className='absolute inline-flex h-full w-full animation-ping rounded-full bg-primary opacity-75'></span>
                 <div className="relative-inline-flex size-[11px] rounded-full bg-primary"></div>
            </span>
         </div>
    </div>
  )
}

export default Ping