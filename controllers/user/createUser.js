const Joi = require("@hapi/joi")
const UserService = require("../../services/UserService")
const tokenService = require("../../services/TokenService")
const fileService = require("../../services/FileService")

const schema = Joi.object({
    email: Joi.string()
        .email({minDomainSegments: 2}),
    password: Joi.string()
        .min(4),
    repeatPassword: Joi.ref('password'),
    firstName: Joi.string()
        .min(3)
        .max(30),
    lastName: Joi.string()
        .min(3)
        .max(30),
    access_token: [
        Joi.string(),
        Joi.number()
    ],
    country: Joi.string(),
    city: Joi.string(),
    birthDate: Joi.string()
})


module.exports = async (req, res) => {
    try{
        await schema.validateAsync(req.body)
        if(req.files){
            let image = req.files.userpic
        }
        let user = await UserService.getUserByEmail(req.body.email)
        if(user !== undefined){
            res.send({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: user.accessToken
            })
        }else{
            user = await UserService.createUser({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                country: req.body.country || "",
                city: req.body.city || "",
                birthDate: req.body.birthDate || ""
            })
            const token = await tokenService.signToken(user.id)
            user = await UserService.updateUser({_id: user._id}, {accessToken: token})
            res.send({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: user.accessToken
            })
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}