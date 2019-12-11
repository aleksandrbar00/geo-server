const Agenda = require("agenda")
const nodemailer = require("nodemailer")
const config = require("../config")

const agenda = new Agenda({db: {address: config.mongoURI, collection: 'agendaJobs'}})
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "baranov201620@gmail.com",
        pass: "Aleksandr200"
    }
})
//reorganize
const mailOptions = {
    from: "baranov201620@gmail.com",
    to: "baranov201620@gmail.com",
    subject: "Test app",
    html: "<p>Test mail letter</p>"
}



agenda.define('sendNotifEmail', (job, done) => {
    mailTransporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(error)
        }else{
            done()
            console.log('Email sent')
        }
    })
})


class NotificationServer{
    constructor(agendaContext){
        this.agenda = agendaContext
    }

    async start(){
        this.agenda.processEvery()
        await this.agenda.start()
    }

    async addEmailTask(){
        await this.agenda.now('sendNotifEmail')
    }
}

module.exports = new NotificationServer(agenda)


