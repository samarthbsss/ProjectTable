import React, { useState, useEffect } from 'react';
import LoadingSpinner from './loading';
import '../Css/use.css'; // Import the CSS file

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
  );
}

export default SearchBar;
