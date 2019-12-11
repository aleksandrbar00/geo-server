const {Chat, Message} = require("../models/Chat")

class ChatMessageService {

    constructor(MessageModel, ChatModel) {
        this.MessageModel = MessageModel
        this.ChatModel = ChatModel
    }

    async sendMessage(userId, id, payload){
        try{
            const chat = await this.ChatModel.findOne({$and: [{_id: id}, {$or: [{subscribers: {$in: [userId]}}, {owner: userId}]}]})
            const message = await this.MessageModel.create(payload)

            if(chat && message){
                chat.messages.push(message._id)
                await chat.save()
                return message
            }

        }catch (e) {
            throw e
        }
    }

    async getChatMessages(userId, id){
        try{
            const chat = await Chat.findOne({$and: [{_id: id}, {subscribers: {$in: [userId]}}]})
                .populate("messages")
                .exec()
            if(chat){
                return chat.messages
            }
        }catch (e) {
            throw e
        }
    }

}

module.exports = new ChatMessageService(Message, Chat)