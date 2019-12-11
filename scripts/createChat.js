const mongoose = require("mongoose")
const User = require("../models/User")
const {Chat, Message} = require("../models/Chat")
const faker = require("faker")
const config = require("../config")

async function createChats(mongooseCtx, subsMax=50){
    try{
        const users = await User.find({}).limit(500)
        console.log(users)
        if(users){
            for(const user of users){
                const chatNum = Math.floor(Math.random() * Math.floor(subsMax))
                const subsNum = 2 + Math.floor(Math.random() * Math.floor(30))
                const chatArr = []


                for(let i = 0; i < chatNum; i++){   
                    let subs = []
                    for(let i = 0; i < subsNum; i++){
                        const subId = Math.floor(Math.random() * Math.floor(users.length - 1))
                        subs.push(users[subId]._id)
                    }
                    
                    chatArr.push({
                        title: faker.lorem.word(),
                        subscribers: subs,
                        owner: user._id,
                    })
                
                }

                for(const chat of chatArr){
                    const dbChat = new Chat(chat)
                    await dbChat.save()
                }
            }
        }
    }catch(err){
        console.log(err)
    }
}


async function createMessages(mongooseCtx, maxMessages=500){

    try{
        const chats = await Chat.find({})

        if(chats){
            for(const chat of chats){

                const msgNum = 30 + Math.floor(Math.random() * Math.floor(maxMessages))
                const msgArr = []
                
                for(let i = 0; i < msgNum; i++){
                    const msgOwner = Math.floor(Math.random() * Math.floor(chat.subscribers.length - 1))
                    msgArr.push({
                        text: faker.lorem.paragraph(),
                        owner: chat.subscribers[msgOwner]._id,
                        chat: chat._id
                    })
                }

                for(const msg of msgArr){
                    const dbMsg = new Message(msg)
                    await dbMsg.save()
                    await Chat.findOneAndUpdate({_id: chat._id}, {$push: {"messages": dbMsg._id}})
                }

            }
        }
    }catch(err){
        console.log(err)
    }


}





async function initCreateUser(){
    try{
        const mongooseCtx = await mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
        await createMessages(mongooseCtx, 200)
        process.exit(0)
    }catch(err){
        console.log(err)
    }
}

initCreateUser()