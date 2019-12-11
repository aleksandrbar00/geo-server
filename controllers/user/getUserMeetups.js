const UserService = require("../../services/UserService")

module.exports = async (req, res) => {
    try{
        const startDateFilter = req.query.startDateFilter
        const endDateFilter = req.query.endDateFilter
        const meetPoints = await UserService.getUserMeetups(req.params.id)
        res.send(meetPoints)
    }catch(err){
        res.send(err)
    }
}