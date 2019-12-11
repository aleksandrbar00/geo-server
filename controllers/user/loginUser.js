const User = require("../../models/User")
const UserService = require("../../services/UserService")
const tokenService = require("../../services/TokenService")
const Joi = require("@hapi/joi")

const schema = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2}),
    password: Joi.string()
        .min(4)
})

module.exports = async (req, res) => {
    try{
        await schema.validateAsync(req.body)
        const user = await UserService.getUserByEmail(req.body.email)
        // const user = await User.findOne({email: req.body.email})
        if(user && user.checkPassword(req.body.password)){
            const token = await tokenService.signToken(user._id)
            const refreshToken = await tokenService.signToken(user._id)
            user.accessToken = refreshToken
            await user.save()
            res.send({
                user: user.getProfile(), 
                token
            })
        } 
    }catch(err){
        res.send(err)
    }
}