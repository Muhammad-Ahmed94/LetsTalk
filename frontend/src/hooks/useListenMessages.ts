import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversationStore from "../stores/useConversationStore";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { addMessage } = useConversationStore();

    useEffect(() => {
        // Listen for new messages from socket
        const handleNewMessage = (newMessage: any) => {
            // Add new message to store for RT displayy
            addMessage(newMessage);

            //TODO notification sound
            // newAudio object
            // sound.play()

            
        }
    }, [])
}