import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import DailyTransactionList from "./DailyTransactions";
import TransactionPopup from "./DetailsForm";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique IDs
import Charts from "./Charts";

interface Transaction {
  id: string; // Unique identifier
  date: string;
  amount: string;
  category: string;
  title: string;
  notes: string;
  type: "Income" | "Expense";
}

const TransactionManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [filteredTransactions, setFilteredTransactions] = useState<{
    [date: string]: Transaction[];
  }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    // Fetch transactions from localStorage
    const storedTransactions: Transaction[] = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    // Filter and group transactions by month
    const monthTransactions = transactions.filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      return (
        transactionDate.month() === currentMonth.month() &&
        transactionDate.year() === currentMonth.year()
      );
    });

    // Sort transactions by date in descending order
    const sortedTransactions = monthTransactions.sort((a, b) => {
      return dayjs(b.date).unix() - dayjs(a.date).unix();
    });

    const groupedTransactions = sortedTransactions.reduce(
      (acc: { [date: string]: Transaction[] }, transaction) => {
        const date = dayjs(transaction.date).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {}
    );

    setFilteredTransactions(groupedTransactions);
  }, [transactions, currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    let updatedTransactions;
    if (selectedTransaction) {
      // Edit existing transaction
      updatedTransactions = transactions.map((transaction) =>
        transaction.id === selectedTransaction.id
          ? updatedTransaction
          : transaction
      );
    } else {
      // Add new transaction
      updatedTransaction.id = uuidv4(); // Assign a unique ID
      updatedTransactions = [...transactions, updatedTransaction];
    }

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
    setShowPopup(false);
    setSelectedTransaction(null);
  };

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowPopup(true);
  };

  const handleAddNewTransaction = () => {
    setSelectedTransaction(null);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTransaction(null);
  };

  const handleDeleteTransaction = (transactionToDelete: Transaction) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionToDelete.id // Use ID for deletion
    );

    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  };

  return (
    <div className="container-md d-flex flex-column mt-2">
      <div className="month-navigation d-flex justify-content-between bg-secondary rounded">
        <Button onClick={handlePreviousMonth} className="btn btn-secondary">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <span className="fs-4 fw-bold">{currentMonth.format("MMMM YY")}</span>
        <Button onClick={handleNextMonth} className="btn btn-secondary">
          <FontAwesomeIcon icon={faArrowRight} />{" "}
        </Button>
        <Button
          variant="primary"
          className="position-absolute rounded-circle"
          style={{ left: "80%", top: "65%" }}
          onClick={handleAddNewTransaction}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <Charts transactions={transactions} />

      <DailyTransactionList
        transactionsByDate={filteredTransactions}
        onUpdateTransaction={handleUpdateTransaction}
        onSelectTransaction={handleSelectTransaction}
        onDeleteTransaction={handleDeleteTransaction} // Pass delete handler
      />

      <TransactionPopup
        show={showPopup}
        onHide={handleClosePopup}
        transaction={selectedTransaction || undefined}
        onSave={handleUpdateTransaction}
      />
      {/* Adding Charts Component */}
    </div>
  );
};

export default TransactionManager;
