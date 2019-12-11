const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const config = require("../config")
const User = require("../models/User")

passport.use(
    new JwtStrategy({
        secretOrKey: config.secret  ,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async function(jwtPayload, done){
        try{
            const user = await User.findOne({_id: jwtPayload.id})
            if(user){
                done(null, user.getProfile())
            }else{
                done(null, false)
            }
        }catch(err){
            done(err, false)
        }
    })

)