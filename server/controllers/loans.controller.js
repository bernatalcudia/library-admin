const LOAN_DAYS = 30
const Book = require("../models/Book")
const Loan = require("../models/Loan")
const Member = require("../models/Member")

const loanBookToMember = async (req, res) => {
    const memberId = req.body.memberId
    const bookId = req.body.bookId

    const foundBook = await Book.findByPk(bookId)

    if (!foundBook) {
        res.status(404).send("Book not found")
        return
    }

    const foundMember = await Member.findByPk(memberId)

    if (!foundMember) {
        res.status(404).send("Member not found")
        return
    }


    const currentDate = new Date()
    const calculateDeadLine = currentDate.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000
    const createdLoad = await Loan.create({
        loanDate: currentDate,
        deadline: calculateDeadLine,
        BookId: bookId,
        MemberId: memberId,
    })
    res.status(201).send({ deadline: loanBookToMember.deadline })
}

exports.loanBookToMember = loanBookToMember;