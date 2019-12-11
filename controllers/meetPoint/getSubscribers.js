const MeetPoint = require("../../models/MeetPoint")


module.exports = async (req, res) => {
    try{
        const meetPoint = await MeetPoint.findOne({_id: req.params.id})
            .populate('subscribers')
            .exec()
        const response = meetPoint.subscribers.map((item) => {return item.getProfile()})
        if(meetPoint){
            res.send(response)
        }

    }catch(err){
        console.log(err)
        res.send(err)
    }
}