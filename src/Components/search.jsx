import React from "react";
import { useState, useEffect } from "react";
import { fetchProject } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Css/search.css";
import ProjectModalForm from "./projectmodal";
import axios from "axios";

const Search = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const projectData = useSelector((state) => state.project);
  const dispatch = useDispatch();

  // search and its funtionalitessss
  const debounce = (func, delay) => {
    let timer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = (value) => {
    const filteredData = projectData.filter(item =>
      item.customer.toLowerCase().includes(value.toLowerCase()) || 
      item.turbineframesr.includes(value)
    );
    setSearchResults(filteredData);
  };

  const debouncedSearch = debounce(handleSearch, 300);

  // Handle changes in the search input
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // api calls

  const handledelete = async (index) => {
    try {
      await axios.delete(`api/project/${index}`);
      console.log("delete success");
      dispatch(fetchProject());
    } catch (error) {
      console.log("delete failed", error);
    }
  };

  useEffect(() => {
    console.log("working");
    dispatch(fetchProject());
  }, []);

  // modal property
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div id="searchmain">
      <h1>Project details</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." className="search-input"
          value={searchTerm}
          onChange={handleChange}
        />
        {/* <button className="search-button">
          Search
        </button> */}
      </div>

      <div id="nav">
        <button className="button-30" onClick={openModal}>
          Add project
        </button>
        <ProjectModalForm
          className="close-button"
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </div>
      <div id="project-names">
        {
          searchTerm === '' ?
          projectData?.map((item, index) => (
          <div key={index}>
            <div className="project-item">
              <h1 className="project-index">{index + 1}</h1>
              <Link
                to="/data"
                state={{ item: item._id, from: "search" }}
                className="project-link"
              >
                <h1 className="customer-name">{item.customer}</h1>
              </Link>
              <h1 className="sl-no">{item.turbineframesr}</h1>
            </div>
            <div>
              <button onClick={() => handledelete(item._id)}>
                Delete Project
              </button>
            </div>
          </div>
        )):
        searchResults?.map((item, index) => (
          <div key={index}>
            <div className="project-item">
              <h1 className="project-index">{index + 1}</h1>
              <Link
                to="/data"
                state={{ item: item._id, from: "search" }}
                className="project-link"
              >
                <h1 className="customer-name">{item.customer}</h1>
              </Link>
              <h1 className="sl-no">{item.turbineframesr}</h1>
            </div>
            <div>
              <button onClick={() => handledelete(item._id)}>
                Delete Project
              </button>
            </div>
          </div>))
      }
      </div>
    </div>
  );
};

export default Search;
