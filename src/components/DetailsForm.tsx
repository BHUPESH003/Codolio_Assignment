import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Tabs, Tab } from "react-bootstrap";
import '../styles/TransactioPopup.css'; // Corrected file name

type CategoryType = "Income" | "Expense";

interface Transaction {
  id: string; // Unique identifier
  date: string;
  amount: string;
  category: string;
  title: string;
  notes: string;
  type: CategoryType;
}

const categories: Record<CategoryType, string[]> = {
  Income: ["Salary", "Investment", "Other"],
  Expense: ["Rent", "Utilities", "Groceries", "Entertainment", "Other"],
};

interface TransactionPopupProps {
  show: boolean;
  onHide: () => void;
  transaction?: Transaction; // Optional transaction prop
  onSave: (transaction: Transaction) => void;
}

const TransactionPopup: React.FC<TransactionPopupProps> = ({
  show,
  onHide,
  transaction,
  onSave,
}) => {
  const [activeKey, setActiveKey] = useState<CategoryType>("Income");
  const [form, setForm] = useState<Transaction>({
    id: "", // Ensure this is included
    date: "",
    amount: "",
    category: categories["Income"][0],
    title: "",
    notes: "",
    type: "Income",
  });

  useEffect(() => {
    if (transaction) {
      setForm(transaction);
      setActiveKey(transaction.type);
    } else {
      setForm({
        id: "", // Reset ID for new transaction
        date: "",
        amount: "",
        category: categories["Income"][0],
        title: "",
        notes: "",
        type: "Income",
      });
    }
  }, [transaction]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleTabSelect = (key: string | null) => {
    if (key) {
      setActiveKey(key as CategoryType);
      setForm(prevForm => ({
        ...prevForm,
        category: categories[key as CategoryType][0],
        type: key as CategoryType,
      }));
    }
  };
  const handleResetForm = () => {
    setForm({
      id: '', // Reset id to default
      date: "",
      amount: "",
      category: categories[activeKey][0],
      title: "",
      notes: "",
      type: activeKey,
    });
  };

  const handleSubmit = () => {
    if (form.date && form.amount && form.title) {
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
              name="date"
              value={form.date}
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
              name="notes"
              value={form.notes}
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
