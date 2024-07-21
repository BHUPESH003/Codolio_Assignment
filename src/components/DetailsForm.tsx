import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Tabs, Tab } from "react-bootstrap";
import "../styles/TransactioPopup.css"; // Corrected file name
import { Transaction } from "./types/interface";


const categories: Record<string, string[]> = {
  Income: ["Salary", "Investment", "Other"],
  Expense: ["Rent", "Utilities", "Groceries", "Entertainment", "Other"],
};

interface TransactionPopupProps {
  show: boolean;
  onHide: () => void;
  transaction?: Transaction; // Optional transaction prop
  onSave: (transaction: Transaction) => void;
}

const generateUID = () => {
  // Generate a random integer between 1000 and 100000
  return Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
};

const TransactionPopup: React.FC<TransactionPopupProps> = ({
  show,
  onHide,
  transaction,
  onSave,
}) => {
  const [activeKey, setActiveKey] = useState<string>("Income");
  const [form, setForm] = useState<Transaction>({
    id: -100, // Ensure this is included
    dateTime: "",
    amount: 0,
    category: categories["Income"][0],
    title: "",
    note: "",
    currency: "",
    type: "Income",
  });

  useEffect(() => {
    if (transaction) {
      setForm(transaction);
      setActiveKey(transaction.type);
    } else {
      setForm({
        id: generateUID(), // Assign a new UID for new transactions
        dateTime: "",
        amount: 0,
        category: categories["Income"][0],
        title: "",
        note: "",
        currency: "",
        type: "Income",
      });
    }
  }, [transaction]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTabSelect = (key: string | null) => {
    if (key) {
      setActiveKey(key as string);
      setForm((prevForm) => ({
        ...prevForm,
        category: categories[key as string][0],
        type: key as string,
      }));
    }
  };

  const handleResetForm = () => {
    setForm({
      id: generateUID(), // Assign a new UID for new transactions
      dateTime: "",
      amount: 0,
      category: categories[activeKey][0],
      title: "",
      note: "",
      currency: "",
      type: activeKey,
    });
  };

  const handleSubmit = () => {
    if (form.dateTime && form.amount && form.title) {
      onSave(form);
      handleResetForm();
      onHide();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} className="custom-modal" centered>
      <Modal.Header>
        <Tabs
          activeKey={activeKey}
          onSelect={handleTabSelect}
          id="transaction-tabs"
          className="w-100"
          fill
        >
          <Tab eventKey="Income" title="Income" />
          <Tab eventKey="Expense" title="Expense" />
        </Tabs>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Col} controlId="formDate" className="form-group">
            <Form.Label className="form-label">Date</Form.Label>
            <Form.Control
              type="date"
              name="dateTime"
              value={form.dateTime}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formAmount" className="form-group">
            <Form.Label className="form-label">Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formCategory" className="form-group">
            <Form.Label className="form-label">Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
              className="form-control"
            >
              {categories[activeKey].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formTitle" className="form-group">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formNotes" className="form-group">
            <Form.Label className="form-label">Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={form.note}
              onChange={handleInputChange}
              className="form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionPopup;
