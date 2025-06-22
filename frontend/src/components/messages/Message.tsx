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

  console.log("Message data:", { 
    messageId: message._id, 
    senderId: message.senderId, 
    currentUserId: user?._id, 
    isFromMe,
    receiverId: message.receiverId,
    selectedConversationId: selectedConversation?._id
  });
  
  return (
    <div className={`chat mb-4 ${isFromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full overflow-hidden">
          <img src={profilePicture || "/avatar.png"} alt="Profile_Pic" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className={`chat-bubble text-white font-semibold bg-green_primary ${
        isFromMe 
          ? 'bg-green_primary' 
          : 'bg-gray-600'
      }`}>{message.message}</div>
      {/* CHAT FOOTER */}
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {timeStamp(message.createdAt)}
      </div>
    </div>
  );
};

export default Message;
