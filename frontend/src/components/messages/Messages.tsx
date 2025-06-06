import React from 'react'

import Message from './Message'
import useConversationStore from '../../stores/useConversationStore'

type Props = {}

const Messages = (props: Props) => {
  const { loading, messages } = useConversationStore();

  if(loading) {
    return (<div className='flex-center px-4 flex-1 overflow-auto'>
      <p>Loading message...</p>
    </div>)
  };

  if(messages.length === 0) {
    return (
      <div className='flex-center px-4 overflow-auto flex-1'>
        <p className='text-gray-400'>No message yet. Begin the conversation now</p>
      </div>
    )
  };

  return (
    <div className='px-4 flex-1 overflow-auto'>
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
  )
}

export default Messages
