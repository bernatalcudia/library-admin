const LOAN_DAYS = 30
const { Op } = require("sequelize")
const Book = require("../models/Book")
const Loan = require("../models/Loan")
const Member = require("../models/Member")

const loanBookToMember = async (req, res) => {
    const memberId = req.body.memberId
    const bookId = req.body.bookId

    const foundBook = await Book.findByPk(bookId)

    const foundMember = await Member.findByPk(memberId)

    if (!foundMember) {
        res.status(404).send("Member not found")
        return
    }


    if (!foundBook) {
        res.status(404).send("Book not found")
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


const listLoansAndFilteredMember = async (req, res) => {
    const memberId = req.query.memberId
    const activeLoans = req.query.activeLoans

    const foundMember = await Member.findByPk(memberId)
    if (!foundMember) {
        res.status(404).send("Member not found")
        return
    }

    const whereFilter = {}

    if (memberId) {
        whereFilter.MemberId = memberId
    }

    if (activeLoans === "true") {
        whereFilter.returnDate = null
    }

    if (activeLoans === "false") {
        whereFilter.returnDate = {
            [Op.not]: null,
        }
    }

    const loans = await Loan.findAll({
        where: whereFilter,
        include: [{ model: Book }, { model: Member }]
    })

    const parsedLoans = loans.map((loan) => {
        return {
            returnDate: loan.returnDate,
            loanDate: loan.loanDate,
            deadline: loan.deadline,
            bookTitle: loan?.Book?.title,
            memberName: loan?.Member?.name,
        }
    })
    res.send(parsedLoans)
}

exports.loanBookToMember = loanBookToMember;
exports.listLoansAndFilteredMember = listLoansAndFilteredMember;