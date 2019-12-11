const {Chat, Message} = require("../../models/Chat")
const mongoose = require("mongoose")
const Joi = require("joi")
const ChatMessageService = require("../../services/ChatMessageService")

const schema = Joi.object({
    text: Joi.string()
})

module.exports = async (req, res) => {
    let dbSession = null
    try{
        await schema.validate(req.body)
        const message = {
            text: req.body.text,
            chat: req.params.chatId,
            owner: req.user.id
        }
        dbSession = await mongoose.startSession()
        dbSession.startTransaction()
       /* const chat = await Chat.findOne({_id: req.params.chatId})
        const dbMessage = new Message(message)
        if(dbMessage && (chat.owner === req.user.id || chat.subscribers.includes(req.user.id))){
            await dbMessage.save()
            chat.subscribers.push(dbMessage._id)
            await chat.save()*/

            const dbMessage = await ChatMessageService.sendMessage(req.user.id, req.params.chatId, message)

            await dbSession.commitTransaction()
            res.send(dbMessage)

    }catch(err){
        console.log(err)
        dbSession.abortTransaction()
        res.send(err)
    }finally{
        dbSession.endSession()
    }
}