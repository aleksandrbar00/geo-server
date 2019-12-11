const User = require("../models/User")

class UserService {

    constructor(userModel){
        this.userModel = userModel
    }

    async getUserById(id){
        try{
            return await this.userModel.findOne({_id: id})
        }catch (e) {
            throw e
        }
    }

    async getUserByEmail(email){
        try{
            const user = await this.userModel.findOne({email})
            if(user){
                return user
            }
        }catch (e) {
            throw e
        }
    }

    async createUser(payload){
        try{
            return await this.userModel.create(payload)

        }catch (e) {
            throw e
        }
    }

    async updateUser(id, payload){
        try{
            return await this.userModel.findOneAndUpdate({_id: id}, {$set: payload}, {new: true})
        }catch (e) {
            throw e
        }
    }

    async getUserMeetups(id, range){
        try{
            const user = await this.userModel.findOne({_id: id})
                .populate("meetups")
                .exec()
            if(user){
                return user.meetups
            }
        }catch (e) {
            throw e
        }
    }

    async getRangeMeetups(id, range){
        try{
            const meetups = await this.userModel.findOne({_id: id})
                .populate()
        }catch (e) {
            throw e
        }
    }


}


module.exports = new UserService(User)