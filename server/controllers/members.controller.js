const Member = require("../models/Member.js")
const bcryptjs = require("bcryptjs")

const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config/config.json")["development"]

const login = async (req, res) => {
    const memberUsername = req.body.username
    const memberPassword = req.body.password

    if (!memberPassword || !memberName || !memberUsername) {
        res.status(400).send("Missing required info")
        return
    }

    const hashedPassword = bcryptjs.hashSync(memberPassword)

    const user = await Member.findOne({ where: { user: username } })
    if (!user) {
        res.status(400).send("Incorrect user")
        return
    }
    const isPasswordMatch = bcryptjs.compareSync(password, user.password)
    if (!isPasswordMatch) {
        res.status(400).send("Incorrect password")
    }

    const token = jwt.sign({ id: user.id }, jwt_secret)

    res.status(201).send({ token: token })

}



const createMember = async (req, res) => {
    const memberName = req.body.name
    const memberUsername = req.body.user
    const memberPassword = req.body.password

    try {

        const existingUser = await Member.findOne({ where: { user: memberUsername } })
        if (!existingUser) {
            res.status(400).send("User already exists")
            return
        }


        const createdMember = await Member.create({
            name: memberName,
            user: memberUsername,
            registrationDate: new Date(),
            password: hashedPassword,
        })
        res.status(201).send({ id: createMember.id })


    } catch (error) {
        console.log(error)
        res.status(500).send("Unexpected register error")
    }

}




exports.createMember = createMember;
exports.login = login