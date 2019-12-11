const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        max: 512,
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "chat"
    }
})

const chatSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: []
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
        default: []
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    
})

exports.Message = mongoose.model("message", messageSchema)
exports.Chat = mongoose.model("chat", chatSchema)