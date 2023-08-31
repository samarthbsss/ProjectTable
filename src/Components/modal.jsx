import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import "../Css/modal.css";
import { addData, fetchData } from "../Redux/action";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalForm = ({ isOpen, closeModal }) => {
  const [newItem, setNewItem] = useState({
    itemdesc: "",
    ttlreference: "",
    hydtest: "",
    date: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newItem);
    dispatch(addData(newItem));
    // dispatch(fetchData());
    closeModal();
    setNewItem({
      itemdesc: "",
      ttlreference: "",
      hydtest: "",
      date: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal Form"
    >
      <h2>Modal Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Desc</label>
          <input
            type="text"
            placeholder="Item Desc"
            value={newItem.itemdesc}
            onChange={(e) =>
              setNewItem({ ...newItem, itemdesc: e.target.value })
            }
          />
        </div>
        <div>
          <label>TTL Reference</label>
          <input
            type="text"
            placeholder="TTL Reference"
            value={newItem.ttlreference}
            onChange={(e) =>
              setNewItem({ ...newItem, ttlreference: e.target.value })
            }
          />
        </div>
        <div>
          <label>HYD TEST</label>
          <textarea
            placeholder="hydtest"
            value={newItem.hydtest}
            onChange={(e) =>
              setNewItem({ ...newItem, hydtest: e.target.value })
            }
          />
        </div>
        <div>
          <label>DATE</label>
          <input
            type="date"
            placeholder="date"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
          />
        </div>
        <button className="modal-button" type="submit">
          Submit
        </button>
      </form>
      <button className="modal-button" onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default ModalForm;
