const mongoose = require("mongoose")
const hasher = require("../auth/hasher")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 6
    },
    firstName: {
        type: String,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        min: 3,
        max: 30
    },
    accessToken: {
        type: String
    },
    meetups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "meetPoint"
    }],
    langs: [{
        type: String,
        default: ["EN"]
    }],
    country: {
        type: String
    },
    city: {
        type: String
    },
    birthDate: {
        type: Date,
    },
    googleAccount: {
        type: String
    },
    twitterAccount: {
        type: String
    },
    facebookAccount:{
        type: String
    }
})

userSchema.pre('save', async function(next){
    this.password = await hasher.hash(this.password)
    next()
})

userSchema.method('getProfile', function(){
    return {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        meetups: this.meetups || [],
        country: this.country || "",
        city: this.city || "",
        langs: this.langs || ["EN"],
        birthDate: this.birthDate || "",
        googleAccount: this.googleAccount || "",
        twitterAccount: this.twitterAccount || "",
        facebookAccount: this.facebookAccount || "",
    }
})

userSchema.method("checkPassword", async function(password){
    return await hasher.verify(this.password, password)
})

module.exports = mongoose.model('user', userSchema)