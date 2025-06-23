import { TiMessages } from "react-icons/ti";

import useConversationStore from "../../stores/useConversationStore";
import useUserStore from "../../stores/useUserStore";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation } = useConversationStore();

  return (
    <div className="md:min-w-[450px] flex flex-col h-full bg-black_light">
      {!selectedConversation?.name ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Sticky Header */}
          <div className="bg-black_full px-4 py-2 capitalize sticky top-0 z-10">
            <span className="label-text">To: </span>
            <span className="text-black_ligth">
              {selectedConversation?.name || "No chat one selected"}
            </span>
          </div>

          {/* Scrollable messages */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          {/* Input always at bottom */}
          <div className="border-t">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { user } = useUserStore();

  return (
    <div className="flex-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user?.name || "User"} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default MessageContainer;
