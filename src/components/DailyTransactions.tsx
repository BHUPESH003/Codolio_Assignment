import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
  id: number;
  dateTime: string;
  amount: number;
  type: "Income" | "Expense";
  category: string;
  title: string;
  currency: string;
  note: string;
}

interface DailyTransactionListProps {
  transactionsByDate: { [date: string]: Transaction[] };
  onUpdateTransaction: (transaction: Transaction) => void;
  onSelectTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transaction: Transaction) => void;
}

const getCategoryBgColor = (category: string): string => {
  switch (category) {
    case "Salary":
    case "Investment":
      return "bg-success text-white";
    case "Rent":
      return "bg-danger text-white";
    case "Utilities":
      return "bg-warning text-dark";
    case "Groceries":
      return "bg-info text-dark";
    case "Entertainment":
      return "bg-primary text-white";
    default:
      return "bg-secondary text-white";
  }
};

const DailyTransactionList: React.FC<DailyTransactionListProps> = ({
  transactionsByDate,
  onUpdateTransaction,
  onSelectTransaction,
  onDeleteTransaction,
}) => {
  return (
    <div className="transaction-list">
      {Object.keys(transactionsByDate).map((date) => {
        const dailyTransactions = transactionsByDate[date];
        const totalIncome = dailyTransactions
          .filter((t) => t.type === "Income")
          .reduce((sum, t) => sum + +t.amount, 0);

        const totalExpense = dailyTransactions
          .filter((t) => t.type === "Expense")
          .reduce((sum, t) => sum + +t.amount, 0);

        const formattedDay = dayjs(date).format("dddd, D");

        return (
          <div key={date} className="daily-transactions mb-4">
            <div className="d-flex justify-content-between mb-2">
              <div className="fw-semibold">{formattedDay}</div>
              <div className="totals d-flex">
                <div className="text-success fw-bold mx-2">{totalIncome.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}</div>
                <div className="text-danger fw-bold mx-2">{totalExpense.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}</div>
              </div>
            </div>
            {dailyTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="transaction-item d-flex justify-content-between align-items-center mb-2 p-2"
                onClick={() => onSelectTransaction(transaction)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-75 d-flex align-items-center p-2">
                  <span
                    className={`category ${getCategoryBgColor(
                      transaction.category
                    )} p-1 rounded fw-semibold w-25 text-center`} style={{fontSize:'1.7vw'}}
                  >
                    {transaction.category}
                  </span>
                  <span className="title fw-semibold w-75 mx-2">
                    {transaction.title}
                  </span>
                </div>
                <div>
                  <span
                    className={`amount fw-semibold mx-2 ${
                      transaction.type === "Income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {transaction.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                  </span>

                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTransaction(transaction);
                    }}
                    size="sm"
                    color="red"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default DailyTransactionList;
