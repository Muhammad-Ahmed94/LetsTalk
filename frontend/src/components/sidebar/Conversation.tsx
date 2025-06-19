import { useEffect } from 'react'
import useConversationStore from '../../stores/useConversationStore';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = () => {
  const { 
    getSideBarUsers, 
    loading, 
    sideBarUsers, 
    selectedConversation, 
    setSelectedConversation 
  } = useConversationStore();
  
  // Get online users from socket context
  const { onlineUsers } = useSocketContext();

  // Get sidebar users on initial render
  useEffect(() => {
    getSideBarUsers();
  }, []);

  // Conversation select handler
  const handleSelectConversation = (user: any) => {
    setSelectedConversation(user);
  };
    
  const isUserOnline = (userId: string) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        sideBarUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => handleSelectConversation(user)}
            className={`flex gap-2 items-center hover:bg-sky-500 px-2 py-1 rounded cursor-pointer transition-colors ${
              selectedConversation?._id === user._id 
                ? 'bg-sky-600' 
                : ''
            }`}
          >
            {/* Sidebar user PFP */}
            <div className={`avatar ${isUserOnline(user._id) ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <img
                  src={user.profilePicture || "/avatar.png"}
                  alt={user.name}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sidebar username */}
            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className={`${
                  selectedConversation?._id === user._id 
                    ? 'text-white font-semibold' 
                    : ''
                }`}>
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
}

export default Conversation