import { useEffect, useRef } from 'react';

import useListenMessages from '../../hooks/useListenMessages';
import useConversationStore from '../../stores/useConversationStore'
import Message from './Message'


const Messages = () => {
  const { loading, messages } = useConversationStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // use real-time messages hook
  useListenMessages();

  // move down when new memssages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

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
    <div className='px-4 flex-1 overflow-auto bg-black_light'>
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
        <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages
