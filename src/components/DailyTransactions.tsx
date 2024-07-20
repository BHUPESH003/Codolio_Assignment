import React from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Transaction {
  id: string; // Unique identifier
  date: string;
  amount: string;
  category: string;
  title: string;
  notes: string;
  type: "Income" | "Expense";
}

interface DailyTransactionListProps {
  transactionsByDate: { [date: string]: Transaction[] };
  onUpdateTransaction: (transaction: Transaction) => void;
  onSelectTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transaction: Transaction) => void; // Added delete handler
}

const getCategoryBgColor = (category: string): string => {
  switch (category) {
    case "Salary":
    case "Investment":
      return "bg-success text-white"; // Green background for income
    case "Rent":
      return "bg-danger text-white"; // Red background for rent
    case "Utilities":
      return "bg-warning text-dark"; // Yellow background for utilities
    case "Groceries":
      return "bg-info text-dark"; // Blue background for groceries
    case "Entertainment":
      return "bg-primary text-white"; // Dark blue background for entertainment
    default:
      return "bg-secondary text-white"; // Grey background for other categories
  }
};

const DailyTransactionList: React.FC<DailyTransactionListProps> = ({
  transactionsByDate,
  onUpdateTransaction,
  onSelectTransaction,
  onDeleteTransaction, // Added delete handler
}) => {
  return (
    <div className="transaction-list">
      {Object.keys(transactionsByDate).map((date) => {
        const dailyTransactions = transactionsByDate[date];
        const totalIncome = dailyTransactions
          .filter((t) => t.type === "Income")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const totalExpense = dailyTransactions
          .filter((t) => t.type === "Expense")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        const formattedDay = dayjs(date).format("dddd, D");

        return (
          <div key={date} className="daily-transactions mb-4">
            <div className="d-flex justify-content-between mb-2">
              <div className="fw-semibold">{formattedDay}</div>
              <div className="totals d-flex">
                <div className="text-success fw-bold mx-2">
                  {totalIncome.toFixed(0)}
                </div>
                <div className="text-danger fw-bold mx-2">
                  {totalExpense.toFixed(0)}
                </div>
              </div>
            </div>
            {dailyTransactions.map((transaction) => (
              <div
                key={transaction.id} // Use unique id for key
                className="transaction-item d-flex justify-content-between align-items-center mb-2 p-2"
                onClick={() => onSelectTransaction(transaction)}
                style={{ cursor: "pointer" }}
              >
                <div className="w-75 d-flex align-items-center">
                  <span
                    className={`category ${getCategoryBgColor(
                      transaction.category
                    )} p-1 rounded fw-semibold`}
                  >
                    {transaction.category}
                  </span>
                  <span className="title fw-semibold w-100 mx-2">{transaction.title}</span>
                </div>
                <div>
                  <span
                    className={`amount fw-semibold mx-2 ${
                      transaction.type === "Income"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {parseFloat(transaction.amount).toFixed(0)}
                  </span>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from selecting the transaction
                      onDeleteTransaction(transaction); // Call delete handler
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
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
