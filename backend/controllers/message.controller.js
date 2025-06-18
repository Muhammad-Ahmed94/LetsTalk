import conversationModel from "../models/conversation.model.js";
import messageModel from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; // ID from params, receiver ID
        const senderId = req.user._id; // Id of logged in user

        if(!message || !message.trim()) {
            return res.status(400).json({ message: "Cannot send empty message" });
        }
        // create conversation model for sender and receiver
        // between the current active participants
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        // if there is no conversation between the 2 clients before
        // create new model for 2 users
        if(!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId],
            })
        };

        // populate message model between 2 users
        const newMessages = await messageModel.create({
            senderId,
            receiverId,
            message
        });

        if(newMessages) {
            conversation.messages.push(newMessages._id);
            await conversation.save();
        }

        // SocketIO functionality for RTC
        const receiverSocketId = getReceiverSocketId(receiverId);
        // Send message only to specific receiver
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessages)
        };
        
        res.status(201).json(newMessages);
        console.log("Message sent:", newMessages.message);
    } catch (error) {
        console.error("Message not sent. Error in send message controller", error.message);
        res.sendStatus(500);
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId]}
        }).populate("messages");

        if(!conversation) {
            return res.status(200).json([]);
        };
        
        res.status(200).json(conversation.messages);
        console.log("Get message succcess");
    } catch (error) {
        console.error("Error in get messages controller", error.message);
        res.sendStatus(500);
    }
}
