const MeetPoint = require("../models/MeetPoint")
const User = require("../models/User")

class MeetPointsService {

    constructor(MeetPointModel, UserModel) {
        this.MeetPoint = MeetPointModel
        this.User = UserModel
    }

    async createMeetup(userId, meetup){
        try{
            const dbMeetup = await MeetPoint.create(meetup)
            if(dbMeetup){
                await this.User.findOneAndUpdate({_id: userId}, {$push: {"meetups": dbMeetup._id}})
                return dbMeetup
            }
        }catch (e) {
            throw e
        }
    }

    async voteMeetupRating(id, userId, rate){
        try{
            return await this.MeetPoint.findOneAndUpdate({_id: id}, {$push: {"rates": {owner: userId, value: rate}}})
        }catch (e) {
            throw e
        }
    }

    async getMeetup(id){
        try{
            return await this.MeetPoint.findOne({_id: id})
        }catch (e) {
            throw e
        }
    }

    async subscribeMeetup(id, userId){
        try{
            const meetPoint = await this.MeetPoint.findOne({$and: [{_id: id}, {$nor: [{subscribers: {$in: [userId]}}, {owner: userId}]}]})
            if(meetPoint){
                await this.User.findOneAndUpdate({_id: userId}, {$push: {"meetups": meetPoint._id}})
                meetPoint.subscribers.push(userId)
                return await meetPoint.save()
            }
        }catch (e) {
            throw e
        }
    }

    async updateMeetup(id, userId){
        try{
            return await this.MeetPoint.findOneAndUpdate($and: [{_id: id}], {})
        }catch (e) {
            throw e
        }
    }


}

module.exports = new MeetPointsService(MeetPoint, User)