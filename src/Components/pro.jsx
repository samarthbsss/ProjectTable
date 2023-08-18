import React, { useState, useEffect,  } from 'react';

import { fetchData ,deleteData } from '../Redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ModalForm from './modal';
import '../Css/modal.css'
import '../Css/table.css'

const Main =()=>{
    const tableData = useSelector((state) => state.data);
    console.log(tableData);

    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

    // const [tableData, setTableData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1); 
    const [newItem, setNewItem] = useState({
      itemdesc: '',
      ttlreference: '',
      hydtest: '',
    });

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Kb's Report";
        const headers = [["ITEM", "DATA","hydtest"]];
    
        const data = tableData.map(elt => [elt.itemdesc, elt.ttlreference, elt.hydtest]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf");
      }

      useEffect(() => {
        console.log('working');
        dispatch(fetchData());
      }, []);
    


      const handleDeleteItem = (index) => {
        try {
          dispatch(deleteData(index)); 
          dispatch(fetchData());
        } catch (error) {
          console.error(error);
        }
      };

    const handleEditRow = (index) => {
      setEditingIndex(index);
    };
  
    const handleSaveRow = async (index) => {
      try {
        const updatedItem = {
          ...tableData[index],
          itemdesc: newItem.itemdesc,
          ttlreference: newItem.ttlreference,
          hydtest: newItem.hydtest,
        };
  
        await axios.put(`api/data/${index}`, updatedItem);
        fetchData();
        setEditingIndex(-1);
      } catch (error) {
        console.error(error);
      }
    };
    
    return <>
    <div margin='2px'>
    <button className="open-button" onClick={ exportPDF}>Generate Report</button>
      <button className="open-button"  onClick={openModal}>Add</button>    </div>
        
      <ModalForm className="close-button" isOpen={modalIsOpen} closeModal={closeModal} />
      <table>
        <tbody>
        
          <tr>
          <th>Documents required for quality dossier from ndt</th>  
          </tr>
          {/* <tr >  
          <th>Customer</th>
          <td>Something</td>
          </tr>
          <tr>
            <th>
              Contact.No
            </th>
            <td>
              phone no:
            </td>
            <th>
              Turbine Srno
            </th>
            <td>42</td>
          </tr> */}
        </tbody>
      </table>
      <table>
      <tbody>
        <tr>
          <th>Sl NO</th>
          <th>ITEM DESC</th>
          <th>TTL Reference </th> 
          <th>HYD TEST</th> 
          <th>DATE</th>
          <th>ACTION</th>
        </tr>
        {tableData?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {editingIndex === index ? (
                <input
                  value={newItem.itemdesc}
                  onChange={(e) => setNewItem({ ...newItem, itemdesc: e.target.value })}
                />
              ) : (
                item.itemdesc
              )}
            </td>
            <td>
              {editingIndex === index ? (
                <input
                  value={newItem.ttlreference}
                  onChange={(e) => setNewItem({ ...newItem, ttlreference: e.target.value })}
                />
              ) : (
                item.ttlreference
              )}
            </td>
            <td>
              {editingIndex === index ? (
                <textarea
                  value={newItem.hydtest}
                  onChange={(e) => setNewItem({ ...newItem, hydtest: e.target.value })}
                />
              ) : (
                item.hydtest
              )}
            </td>
            <td>
            {item.date}
            </td>
            <td>
              {editingIndex ===  index ? (
                <button onClick={() => handleSaveRow(item._id)}>Save</button>
              ) : (
                <div className='iconbox'>
                  <FiEdit2  onClick={() => handleEditRow(index)}/>
                  <MdDelete  onClick={() => handleDeleteItem(item._id)}/>
            
                </div>
                   
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    </>



}

export default Main