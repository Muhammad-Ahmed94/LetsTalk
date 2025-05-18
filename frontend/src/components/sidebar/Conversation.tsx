import React from 'react'

type Props = {}

const Conversation = (props: Props) => {
  return (
    <div>
      <div className="flex gap-2 items-center hover:bg-sky-500 px-2 py-1 rounded">
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src="/avatar.png" alt="user avatar" />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p>Muneeb Ahmed</p>
          </div>
        </div>
      </div>
      <div className='divider my-0 py-0 h-1'></div>
    </div>
  );
}

export default Conversation