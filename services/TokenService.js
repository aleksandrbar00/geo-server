const jwt = require("jsonwebtoken")
const config = require("../config")

async function signToken(id){
    return await jwt.sign({id}, config.secret)
}

async function verifyToken(token){
    return await jwt.verify(token, config.secret)
}

module.exports = {
    signToken,
    verifyToken
}