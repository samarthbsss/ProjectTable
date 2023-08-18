import React ,{useState, useEffect} from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import '../Css/modal.css'
import { addData } from '../Redux/action';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const ModalForm = ({ isOpen, closeModal }) => {
  const [newItem, setNewItem] = useState({
    itemdesc: '',
    ttlreference: '',
    hydtest: '',
  });
  // const addData = useSelector((state) => state.data);
  // console.log(addData);

  const dispatch = useDispatch();

//  const addproject =async()=>{
//   try {
//     dispatch(addData(newItem));
//     console.log('workin')
//   } catch (error) {
//     console.log(error);
//     console.log("not working")
//   }
//  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    dispatch(addData(newItem));
    closeModal();
  }
  // const handleAddItem = async () => {
  //   try {

  //     await axios.post('api/data', newItem);
     
  //     // fetchData();
  //     setNewItem({
  //       itemdesc: '',
  //       ttlreference: '',
  //       hydtest: '',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
          onChange={(e) => setNewItem({ ...newItem, itemdesc: e.target.value })}
        />
      </div>
      <div>
        <label>TTL Reference</label>
        <input
          type="text"
          placeholder="TTL Reference"
          value={newItem.ttlreference}
          onChange={(e) => setNewItem({ ...newItem, ttlreference: e.target.value })}
        />
      </div>
      <div>
        <label>HYD TEST</label>
        <textarea
          placeholder="hydtest"
          value={newItem.hydtest}
          onChange={(e) => setNewItem({ ...newItem, hydtest: e.target.value })}
        />
      </div>
        <button className="modal-button" type="submit" >Submit</button>
      </form>
      <button className="modal-button" onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default ModalForm;
