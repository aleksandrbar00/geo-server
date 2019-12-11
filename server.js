const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const expressFileUpload = require("express-fileupload")
const Router = require("./router")
const config = require("./config")

const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

//require auth config
require("./auth/auth")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(expressFileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}))

app.use(morgan('combined'))

app.use(cors())
app.use("/", Router)


app.set('socketio', io)
require("./ioSetup")(io)

server.listen(config.port, async () => {
    try{
        await mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })
        require("./models/MeetPoint").createIndexes()
    }catch(err){
        console.log(err)
    }

})
