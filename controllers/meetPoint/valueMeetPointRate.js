const MeetPointService = require("../../services/MeetPointsService")
const Joi = require("@hapi/joi")

const schema = Joi.object({
    rate: Joi.number()
})

module.exports = async (req, res) => {
    try{
        await schema.validate(req.body)
        const updatedMeetPoint = await MeetPointService.voteMeetupRating(req.params.id, req.user.id, req.body.rate)
        res.send(updatedMeetPoint)
    }catch (e) {
        console.log(e)
        res.send(e)
    }
}