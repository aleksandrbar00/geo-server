const UserService = require("../../services/UserService")
const Joi = require("@hapi/joi")

const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string()
})

module.exports = async (req, res) => {
    try{
        await schema.validate(req.body)
        const updatedUser = await UserService.updateUser(req.params.id, req.body)
        res.send(updatedUser)
    }catch (e) {
        console.log(e)
        res.send(e)
    }
}