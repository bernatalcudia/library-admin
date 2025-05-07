const { DataTypes } = require("sequelize");
const db = require("../db");
const Book = require("./Book")

const Loan = db.sequelize.define(
  "Loan",
  {
    returnDate: {
      type: DataTypes.DATE,
    },
    loanDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

Book.hasMany(Loan)
Loan.belongsTo(Book)

module.exports = Loan;
