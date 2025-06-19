import Messages from "./Messages";
import MessageInput from "./MessageInput";

import { TiMessages } from "react-icons/ti";
import useConversationStore from "../../stores/useConversationStore";
import useUserStore from "../../stores/useUserStore";

type Props = {};

const MessageContainer = (props: Props) => {
  const { selectedConversation } = useConversationStore();
  // const { user } = useUserStore();

  return (
    <div className="md:min-w-[450px] overflow-auto">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-black_full px-4 py-2 mb-2 capitalize">
            <span className="label-text">To: </span>
            <span className="text-black_ligth">
              {selectedConversation.name}
            </span>
          </div>

          <Messages />
          <MessageInput />
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
