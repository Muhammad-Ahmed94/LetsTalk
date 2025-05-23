import React from "react";
import { BsSend } from "react-icons/bs";
type Props = {};

const MessageInput = (props: Props) => {
  return (
    <form className="my-3 px-2">
      <div className="w-full relative">
        <input type="text" placeholder="Type a message" className="border text-sm rounded-lg w-full p-2.5 bg-gray-700 border-gray-600 text-white"/>
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {}
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
