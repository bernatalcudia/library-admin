const Member = require("../models/Member")

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

    req.user = user.dataValues
    next()
}

exports.authMiddleware = authMiddleware