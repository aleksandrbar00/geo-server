const Joi = require("joi")
const MeetPointService = require("../../services/MeetPointsService")
const mongoose = require("mongoose")

const schema = Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
    title: Joi.string(),
    about: Joi.string(),
    meetTime: Joi.date(),
    owner: Joi.string()
})


module.exports = async (req, res) => {
    const socket = req.app.get("socketio")
    let dbSession = null
    try{
        dbSession = await mongoose.startSession()
        await schema.validate(req.body)
        const ownerId = req.user.id
        const coords = [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        const location = {type: 'Point', coordinates: coords}
        dbSession.startTransaction()
        const meetPoint = await MeetPointService.createMeetup(ownerId, {
            title: req.body.title,
            about: req.body.about,
            meetTime: req.body.meetTime,
            owner: ownerId,
            subscribers: [ownerId],
            location: location
        })
        dbSession.commitTransaction()
        socket.emit("create point", meetPoint)
        res.send(meetPoint)
    }catch(err){
        console.log(err)
        dbSession.abortTransaction()
        res.send(err)
    }finally{
        dbSession.endSession()
    }
}