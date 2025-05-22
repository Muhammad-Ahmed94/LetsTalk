import React from 'react'

import Message from './Message'

type Props = {}

const Messages = (props: Props) => {
  return (
    <div className='px-4 flex-1 overflow-auto'>
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages