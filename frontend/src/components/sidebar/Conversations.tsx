import React from 'react'

import Conversation from './Conversation'

type Props = {}

const Conversations = (props: Props) => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  )
}

export default Conversations