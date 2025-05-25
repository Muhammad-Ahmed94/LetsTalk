import React, { useEffect } from 'react'

import Conversation from './Conversation'
import useConversationStore from '../../stores/useConversationStore'

type Props = {}

const Conversations = (props: Props) => {
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <Conversation />
    </div>
  )
}

export default Conversations