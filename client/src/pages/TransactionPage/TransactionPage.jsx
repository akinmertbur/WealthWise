import React, { useState } from "react";
import AddEditTransactionForm from "../../components/AddEditTransactionForm/AddEditTransactionForm";
import Modal from "../../components/Modal/Modal";
import TransactionList from "../../components/TransactionList/TransactionList";
import DateForm from "../../components/DateForm/DateForm";
import "./TransactionPage.css";

const TransactionPage = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [transaction, setTransaction] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [addEdit, setAddEdit] = useState(false);
  const [date, setDate] = useState({ month: "", year: "" });
  const today = new Date();

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setShowModal(false); // Close the modal on success
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
        if (!addEdit) {
          setAddEdit(true);
        }

        setShowModal(true); // Open the edit modal
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
        onClick={() => {
          if (transaction) {
            setTransaction(null);
          }

          if (addEdit) {
            setAddEdit(false);
          }

          setShowModal(true);
        }}
      >
        Add Transaction
      </button>

      <DateForm date={date} setDate={setDate} />

      <TransactionList
        userId={user.id}
        updateList={updateList}
        edit={true}
        onEdit={handleEdit}
        onError={handleError}
        month={date.month ? date.month : today.getMonth() + 1}
        year={date.year ? date.year : today.getFullYear()}
      />

      {/* Modal for adding/editing transaction
          Adding or editing determined based on 'edit' prop */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddEditTransactionForm
          transaction={transaction}
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
          edit={addEdit}
        />
      </Modal>
    </div>
  );
};

export default TransactionPage;
