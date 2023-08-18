import React, { useState, useEffect,  } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Textarea,
  IconButton,
 
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  useDisclosure,
  FormControl,
  FormLabel,

  } from '@chakra-ui/react'
  import { FiEdit2 } from "react-icons/fi";
  import { MdDelete } from "react-icons/md";
  import axios from 'axios';
  import jsPDF from "jspdf";
  import "jspdf-autotable";

  export const Project =()=>{
    const [tableData, setTableData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1); 
    const [newItem, setNewItem] = useState({
      itemdesc: '',
      ttlreference: '',
      hydtest: '',
    });
    const tableSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg' ,xl:'xl'});
    const { isOpen, onOpen, onClose } = useDisclosure();

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
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('api/data');
        setTableData(response.data);
        console.log(tableData, response);
      } catch (error) {
        console.error(error);
      }
    };
    
    const handleAddItem = async () => {
      try {

        await axios.post('api/data', newItem);
       
        fetchData();
        setNewItem({
          itemdesc: '',
          ttlreference: '',
          hydtest: '',
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDeleteItem = async (index) => {
      try {
        await axios.delete(`api/data/${index}`);
        fetchData();
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
    return (
      <>
          <>
    

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} m='4'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            <FormControl>
            <FormLabel>Item Desc</FormLabel>
            <Input
            placeholder="Item Desc"
            value={newItem.itemdesc}
            onChange={(e) => setNewItem({ ...newItem, itemdesc: e.target.value })}
          />
            </FormControl>
            <FormControl>
            <FormLabel>TTL Reference</FormLabel>
            <Input
            placeholder="TTL Reference"
            value={newItem.ttlreference}
            onChange={(e) => setNewItem({ ...newItem, ttlreference: e.target.value })}
          />
            </FormControl>
            <FormControl>
            <FormLabel>HYD TEST</FormLabel>
            <Textarea
            placeholder="hydtest"
            value={newItem.hydtest}
            onChange={(e) => setNewItem({ ...newItem, hydtest: e.target.value })}
          />  
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}  onClick={handleAddItem}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

         <Button onClick={() => exportPDF()}>Generate Report</Button>
         <Button onClick={onOpen}>Open Modal</Button>
        <Table variant="simple"  size={tableSize} border='2px solid teal'>
          <Thead>
            <Tr>
              <Th>Sl No</Th>
              <Th>Item Desc</Th>
              <Th>TTL Reference</Th>
              <Th>HYD TEST</Th>
              <Th >Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            <Tr>
              <Td>
                1
              </Td>
              <Td> <Input
            placeholder="Item Name"
            value={newItem.itemdesc}
            onChange={(e) => setNewItem({ ...newItem, itemdesc: e.target.value })}
          /></Td>
              <Td> <Input
            placeholder="Item Data"
            value={newItem.ttlreference}
            onChange={(e) => setNewItem({ ...newItem, ttlreference: e.target.value })}
          /></Td>
              <Td> <Textarea
            placeholder="hydtest"
            value={newItem.hydtest}
            onChange={(e) => setNewItem({ ...newItem, hydtest: e.target.value })}
          /></Td>
          <Td>
          <Button onClick={handleAddItem}>Add Item</Button>
        
          </Td>
            </Tr>
            {tableData.map((item, index) => (
        
              <Tr key={index}>
                <Td>
                {index + 1}
                </Td>
              <Td>
                {editingIndex === index ? (
                  <Input
                    value={newItem.itemdesc}
                    onChange={(e) => setNewItem({ ...newItem, itemdesc: e.target.value })}
                  />
                ) : (
                  item.itemdesc
                )}
              </Td>
              <Td>
                {editingIndex === index ? (
                  <Input
                    value={newItem.ttlreference}
                    onChange={(e) => setNewItem({ ...newItem,  ttlreference: e.target.value })}
                  />
                ) : (
                  item.ttlreference
                )}
              </Td>
              <Td>
                {editingIndex === index ? (
                  <Textarea
                    value={newItem.hydtest}
                    onChange={(e) => setNewItem({ ...newItem, hydtest: e.target.value })}
                  />
                ) : (
                  item.hydtest
                )}
              </Td>
              <Td>
                {editingIndex === index ? (
                  <Button onClick={() => handleSaveRow(index)}>Save</Button>
                ) : (
                  <IconButton
                    variant="ghost"
                    aria-label="Edit"
                    icon={<FiEdit2 />}
                    onClick={() => handleEditRow(index)}
                  />
                )}
                <IconButton
                  variant="ghost"
                  aria-label="Delete"
                  icon={<MdDelete />}
                  onClick={() => handleDeleteItem(index)}
                />
              </Td>
            </Tr>

            ))}
          </Tbody>
        </Table>
      </>
    );
}
