import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import DailyTransactionList from "./DailyTransactions";
import TransactionPopup from "./DetailsForm";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Charts from "./Charts";
import transactionsData from "../utils/Transactions.json"; // Import the JSON file

type CategoryType = "Income" | "Expense";

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


const TransactionManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsData); // Set the initial state to the imported data
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [filteredTransactions, setFilteredTransactions] = useState<{
    [date: string]: Transaction[];
  }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Filter and search states
  const [filterType, setFilterType] = useState<CategoryType | "All">("All");
  const [filterCategory, setFilterCategory] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter and group transactions by month
    let monthTransactions = transactions.filter((transaction) => {
      const transactionDate = dayjs(transaction.dateTime);
      return (
        transactionDate.month() === currentMonth.month() &&
        transactionDate.year() === currentMonth.year()
      );
    });

    // Apply filters
    if (filterType !== "All") {
      monthTransactions = monthTransactions.filter(
        (transaction) => transaction.type === filterType
      );
    }
    if (filterCategory !== "All") {
      monthTransactions = monthTransactions.filter(
        (transaction) => transaction.category === filterCategory
      );
    }
    if (searchQuery) {
      monthTransactions = monthTransactions.filter((transaction) =>
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort transactions by date in descending order
    const sortedTransactions = monthTransactions.sort((a, b) => {
      return dayjs(b.dateTime).unix() - dayjs(a.dateTime).unix();
    });

    const groupedTransactions = sortedTransactions.reduce(
      (acc: { [date: string]: Transaction[] }, transaction) => {
        const date = dayjs(transaction.dateTime).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {}
    );

    setFilteredTransactions(groupedTransactions);
  }, [transactions, currentMonth, filterType, filterCategory, searchQuery]);

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
      updatedTransactions = [...transactions, updatedTransaction];
    }

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
      (transaction) => transaction.id !== transactionToDelete.id
    );

    setTransactions(updatedTransactions);
  };

  return (
    <div className="container-custom  d-flex flex-column mt-2">
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
          className="position-fixed rounded-circle"
          style={{ left: "89%", top: "54%" }}
          onClick={handleAddNewTransaction}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <Charts transactions={transactions} />

      <div className="filters d-flex justify-content-between mb-3">
        <Form.Group controlId="filterType" className="me-2">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as CategoryType | "All")
            }
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterCategory" className="me-2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as string | "All")
            }
          >
            <option value="All">All</option>
            {/* Add more categories as needed */}
            <option value="Salary">Salary</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="search" className="flex-grow-1">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </div>

      <DailyTransactionList
        transactionsByDate={filteredTransactions}
        onUpdateTransaction={handleUpdateTransaction}
        onSelectTransaction={handleSelectTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />

      <TransactionPopup
        show={showPopup}
        onHide={handleClosePopup}
        transaction={selectedTransaction || undefined}
        onSave={handleUpdateTransaction}
      />
    </div>
  );
};

export default TransactionManager;
