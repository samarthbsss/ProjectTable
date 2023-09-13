import React, { useState, useEffect } from 'react';
import LoadingSpinner from './loading';
import '../Css/use.css'; // Import the CSS file
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Simulated data for this example
  const data = ['Apple', 'Banana', 'Cherry', 'Fiiig', 'Fiig', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

  // Function to handle debouncing
  const debounce = (func, delay) => {
    let timer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Function to handle search
  const handleSearch = (value) => {
    const filteredData = data.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  // Debounce the search function
  const debouncedSearch = debounce(handleSearch, 300);

  // Handle changes in the search input
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <div className="undertale-container">
      <LoadingSpinner />
      <input
        className="undertale-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul className="undertale-list">
        {searchResults.map((result, index) => (
          <li key={index} className="undertale-list-item">{result}</li>
        ))}
      </ul>
      
    </div>
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>

          <textarea/>
        </Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
  <Table size='sm'>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
    </div>
    
  );
}

export default SearchBar;
