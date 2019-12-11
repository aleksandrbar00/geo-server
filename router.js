const Router = require("express").Router()
const passport = require("passport")
const userController = require("./controllers/user")
const meetPointController = require("./controllers/meetPoint")
const imageController = require("./controllers/image")
const messageController = require("./controllers/messages")
const chatsController = require("./controllers/chat")

//user-routes
Router.post("/user", userController.createUser)
Router.put("/user/:id", userController.updateUser)
Router.post("/user/login", userController.loginUser)
Router.get("/user/chat", (req, res) => {res.send("dsa")})
Router.get("/user/:id", passport.authenticate("jwt", {session: false}),userController.getUser)
Router.get("/user/:id/meetups", passport.authenticate("jwt", {session: false}), userController.getUserMeetups)

//meet-point-routes
Router.get("/meet-point/active", meetPointController.getActivePoints)
Router.post("/meet-point", passport.authenticate("jwt", {session: false}), meetPointController.createPoint)
Router.get("/meet-point/:id", passport.authenticate("jwt", {session: false}), meetPointController.getPoint)
Router.post("/meet-point/:id/subscribe", passport.authenticate("jwt", {session: false}), meetPointController.subscribePoint)
Router.get("/meet-point/:id/subscribers", passport.authenticate("jwt", {session: false}), meetPointController.getSubscribers)
Router.put("/meet-point/:id/rate", passport.authenticate("jwt", {session: false}), meetPointController.valueMeetPointRate)

//upload-routes
Router.post("/image/upload", passport.authenticate("jwt", {session: false}), imageController.uploadAvatar)
Router.get("/image", imageController.getSizedImage)

//chats-routes
Router.get("/chats", passport.authenticate("jwt", {session: false}), chatsController.getUserChats)

//message-routes
Router.post("/chat/:chatId/send-message", passport.authenticate("jwt", {session: false}), messageController.sendMessage)
Router.get("/chat/:chatId/messages", passport.authenticate("jwt", {session: false}), messageController.getChatMessages)

module.exports = Router