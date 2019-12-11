const mongoose = require("mongoose")
const faker = require("faker")
const MeetPoint = require("../models/MeetPoint")
const User = require("../models/User")
const config = require("../config")


async function createUsers(mongooseCtx, userNums){

    try{
        if(!userNums){
            userNums = 50
        }
        const categoryArr = ["eating", "walk out"]
        const langArr = ["EN", "RU"]
        const iterArr = []

        for(let i = 0; i < userNums; i++){
            const randomCategory = Math.floor(Math.random() * Math.floor(2))
            iterArr.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.lorem.word(),
                langs: langArr[randomCategory],
                country: faker.address.country(),
                city: faker.address.city(),
                birthDate: faker.date.past()
            })
        }

        for(const item of iterArr){
            const dbUser = new User(item)
            await dbUser.save()
        }
    }catch(err){
        console.log(err)
    }

    
}

async function createMeetPoints(mongooseCtx, pointsNum, subsMax=35){
    
    try{
        if(!pointsNum){
            pointsNum = 500
        }
    
        const userArr = await User.find({})
        const userArrLen = userArr.length
        const meetArr = []
    
        for(let i = 0; i < pointsNum; i++){
            const userRandId = Math.floor(Math.random() * Math.floor(userArrLen))
            const userId = userArr[userRandId]["_id"]
            const subsNum = Math.floor(Math.random() * Math.floor(subsMax))
            const subs = []

            for(let i = 0; i < subsNum; i++){
                const subId = Math.floor(Math.random() * Math.floor(userArr.length))
                const subUserId = userArr[subId]._id
                if(subUserId === userId){
                    continue
                }else {
                    subs.push(userArr[subId]._id)
                }
            }

            meetArr.push({
                title: faker.lorem.slug(),
                about: faker.lorem.paragraph(),
                meetTime: faker.date.future(),
                location: {
                    type: "Point",
                    coordinates: [faker.address.longitude(), faker.address.latitude()]
                },
                owner: userId,
                subscribers: [userId, ...subs]

            })
        }

        for(const item of meetArr){
            const meetPoint = new MeetPoint(item)
            await User.findOneAndUpdate({_id: meetPoint.owner}, {$push: {"meetups": meetPoint._id}})
            await meetPoint.save()
        }
    }catch(err){
        console.log(err)
    }

}


async function initFakeDb(){
    try{
        const mongooseCtx = await mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
        await createUsers(mongooseCtx, 500)
        await createMeetPoints(mongooseCtx, 1000)
        process.exit(0)
    }catch(err){
        console.log(err)
    }
}   

initFakeDb()