const ChatMessageService = require("../../services/ChatMessageService")

module.exports = async (req, res) => {
    try{
        const chatId = req.params.chatId
        const messages = await ChatMessageService.getChatMessages(req.user.id, chatId)
        if(messages){
            res.send(messages)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}