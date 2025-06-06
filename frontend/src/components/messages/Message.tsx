import useConversationStore from "../../stores/useConversationStore";
import useUserStore from "../../stores/useUserStore";


const Message = ({ message }: { message: any }) => {
  const { user } = useUserStore();
  const { selectedConversation } = useConversationStore();

  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={user?.avatar || "/avatar.png"} alt="Profile_Pic" />
        </div>
      </div>

      <div className={`chat-bubble text-white bg-blue-500`}>
        {message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};

export default Message;
