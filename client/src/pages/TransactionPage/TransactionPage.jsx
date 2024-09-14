import React, { useState } from "react";
import AddTransactionForm from "../../components/AddTransactionForm/AddTransactionForm";
import EditTransactionForm from "../../components/EditTransactionForm/EditTransactionForm";
import Modal from "../../components/Modal/Modal";
import TransactionList from "../../components/TransactionList/TransactionList";
import "./TransactionPage.css";

const TransactionPage = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false); // State to control add modal visibility
  const [showModalEdit, setShowModalEdit] = useState(false); // State to control edit modal visibility
  const [transaction, setTransaction] = useState(null);
  const [updateList, setUpdateList] = useState(false);

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    showModalAdd ? setShowModalAdd(false) : setShowModalEdit(false); // Close modals on success
    setUpdateList(!updateList);
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  const handleEdit = async (transactionId) => {
    try {
      const response = await fetch("/api/transaction/getTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransaction(data.result); // Store the transaction in state
        setShowModalEdit(true); // Open the edit modal
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching transactions.");
    }
  };

  return (
    <div className="transaction-page">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <button
        className="add-transaction-button"
        onClick={() => setShowModalAdd(true)}
      >
        Add Transaction
      </button>

      <TransactionList
        className="transaction-list"
        userId={user.id}
        updateList={updateList}
        edit={true}
        onEdit={handleEdit}
        onError={handleError}
      />

      {/* Modal for adding transaction */}
      <Modal show={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <AddTransactionForm
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {/* Modal for the editing transaction */}
      <Modal show={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <EditTransactionForm
          transaction={transaction}
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>
    </div>
  );
};

export default TransactionPage;
