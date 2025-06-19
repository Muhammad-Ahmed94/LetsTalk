import useConversationStore from "../../stores/useConversationStore";
import useUserStore from "../../stores/useUserStore";

const Message = ({ message }: { message: any }) => {
  const { user } = useUserStore();
  const { selectedConversation } = useConversationStore();

  // Check if message is from current user
  const isFromMe = message.senderId === user?._id;

  // Get profile picture
  const profilePicture = isFromMe ? user?.profilePicture : selectedConversation?.profilePicture;

  const timeStamp = (current: string) => {
    const date = new Date(current);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`chat ${isFromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePicture || "/avatar.png"} alt="Profile_Pic" />
        </div>
      </div>

      <div className={`chat-bubble text-white font-semibold bg-green_primary `}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {timeStamp(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
