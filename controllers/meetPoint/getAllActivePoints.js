const MeetPoint = require("../../models/MeetPoint")


module.exports = async (req, res ) => {
    try{
        const maxLimit = 50
        const limitParam = req.query.limit <= maxLimit ? req.query.limit : maxLimit
        const longitude = req.query.longitude
        const latitude = req.query.latitude  
        const range = req.query.range || 20000
        const points = await MeetPoint.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(longitude), parseFloat(latitude)]
                        },
                        $maxDistance: range
                    }
                }
            })
            .populate({path: "subscribers", select: "firstName lastName"})
            .populate({path: "owner", select: "_id email firstName lastName"})
            .limit(parseInt(limitParam))
            .exec()
        if(points){
            res.send(points)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}