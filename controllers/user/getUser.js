const UserService = require("../../services/UserService")

module.exports = async (req, res) => {
    try{
        const user = await UserService.getUserById(req.params.id)
        if(user){
            res.send(user)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}