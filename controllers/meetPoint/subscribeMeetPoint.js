const MeetPointService = require("../../services/MeetPointsService")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    let dbSession = null
    try{
        dbSession = await mongoose.startSession()
        dbSession.startTransaction()
        const meetPoint = await MeetPointService.subscribeMeetup(req.params.id, req.user.id)
        await dbSession.commitTransaction()
        res.send(meetPoint)
    }catch(err){
        await dbSession.abortTransaction()
        res.send(err)
    }finally{
        dbSession.endSession()
    }
}