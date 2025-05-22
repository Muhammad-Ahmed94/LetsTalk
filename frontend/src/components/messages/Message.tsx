import React from "react";

type Props = {};

const Message = (props: Props) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/avatar.png" alt="tailwind css chat bubble comp" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>
        hi whats upp
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};

export default Message;
