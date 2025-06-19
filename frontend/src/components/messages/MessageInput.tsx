import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useConversationStore from "../../stores/useConversationStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation, sendMessage } = useConversationStore();

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message body to send");
      return;
    }

    if (!selectedConversation) {
      toast.error("Please select a conversation");
      return;
    }

    try {
      await sendMessage(selectedConversation._id, message);
      setMessage("");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} className="my-3 px-2">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus:border-none text-sm rounded-lg w-full p-2.5 bg-black_light border-gray-400 text-white"
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 hover:text-green_secondary transition-colors">
          {}
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
