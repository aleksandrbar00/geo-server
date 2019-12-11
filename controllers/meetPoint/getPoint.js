const MeetPoint = require("../../models/MeetPoint")


module.exports = async (req, res) => {
    try{
        const meetPoint = await MeetPoint.findOne({_id: req.params.id})
        if(meetPoint){
            res.send(meetPoint)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}