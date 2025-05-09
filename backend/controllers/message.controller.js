export const sendMessage = (req, res) => {
    try {
        const { message } = req.body;
        const { id } = req.params;
    } catch (error) {
        console.error("Message not sent. Error in send message controller", error.message);
        res.sendStatus(500);
    }
}