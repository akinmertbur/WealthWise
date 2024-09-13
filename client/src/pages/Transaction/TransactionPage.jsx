import React, { useState } from "react";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import Modal from "../../components/Modal/Modal";
import TransactionList from "../../components/TransactionList/TransactionList";
import "./TransactionPage.css";

const TransactionPage = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setShowModal(false); // Close modal on success
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  return (
    <div className="transaction-page">
      <h2>Transaction Page</h2>

      <button
        className="add-transaction-button"
        onClick={() => setShowModal(true)}
      >
        Add Transaction
      </button>

      {/* Pass the userId to the TransactionList component */}
      <TransactionList userId={user.id} />

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddTransactionForm
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default TransactionPage;
