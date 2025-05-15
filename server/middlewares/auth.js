const Member = require("../models/Member")

const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config/config.json")["development"]


const authMiddleware = async (req, res, next) => {




    const userKey = req.headers["key"]
    if (!userKey) {
        req.status(401).send("Missing key user")
        return
    }

    const user = await Member.findByPk(userKey)
    if (!user) {
        req.send(401).send("Invalid auth header")
        return
    }

    const token = req.headers.authorization

    const payload = jwt.verify(token, jwt_secret)

    const userToken = user.token

    if (!userToken) {
        res.send(401).send("User not authorized")
    }

    req.user = user.dataValues
    next()
}

exports.authMiddleware = authMiddleware