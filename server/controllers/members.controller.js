const Member = require("../models/Member.js")
const bcryptjs = require("bcryptjs")


const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await Member.findOne({ where: { user: username } })
    if (!user) {
        res.status(400).send("Incorrect user")
        return
    }
    const isPasswordMatch = bcryptjs.compareSync(password, user.password)
    if (!isPasswordMatch) {
        res.status(400).send("Incorrect password")
    }
    res.status(201).send({ key: user.id })
}

const createMember = async (req, res) => {
    const memberName = req.body.name
    const createdMember = await Member.create({
        name: memberName,
        registrationDate: new Date(),
    })
    res.status(201).send({ id: createMember.id })
}

exports.createMember = createMember;
exports.login = login