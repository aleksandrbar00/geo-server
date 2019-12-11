const {Chat} = require("../../models/Chat")

module.exports = async (req, res) => {
    try{
        const userId = req.user.id
        const chats = await Chat.find({$or : [{_id: userId}, {subscribers: {$in: [userId]}}]})
        if(chats){
            res.send(chats)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}