import React from "react";
import { useState, useEffect } from "react";
import { fetchProject } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Css/search.css";
import ProjectModalForm from "./projectmodal";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import LoadingSpinner from "./loading";
import { TextRandom } from "./randomtext";

const Search = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isloading, setLoading] = useState(true);

  const projectData = useSelector((state) => state.project);
  const dispatch = useDispatch();

  // search and its funtionalitessss
  const debounce = (func, delay) => {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = (value) => {
    const filteredData = projectData.filter(
      (item) =>
        item.customer.toLowerCase().includes(value.toLowerCase()) ||
        item.turbineframesr.includes(value) || item.contactno.toLowerCase().includes(value.toLowerCase())
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
    setLoading(true);
    dispatch(fetchProject());
    setLoading(false);
    console.log("working", projectData);
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
      <h1 className="project-details-header"> Project details</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      <div id="nav">
        <button className="add-project" onClick={openModal}>
          Add project
        </button>
        <ProjectModalForm
          className="close-button"
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      </div>

      <div id="project-main">
        {searchTerm === "" ? (
          isloading ? (
            <LoadingSpinner />
          ) : (
            projectData?.map((item, index) => (
              <div key={index}>
                <div className="project-item">
                  <h1 className="project-index">{index + 1}. </h1>
                  <Link
                    to="/data"
                    state={{ item: item._id, from: "search" }}
                    className="project-link"
                  >
                    <div className="project-content">
                      <h1 className="customer-name">{item.customer}</h1>
                      <h1 className="contract-no">{item.contactno}</h1>
                      <h1 className="sl-no">{item.turbineframesr}</h1>
                    </div>
                  </Link>
                  <div className="delete-button">
                    <button onClick={() => handledelete(item._id)}>
                      <MdDeleteForever className="delete-icon" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          searchResults.length=== 0 ? 
          
        (<TextRandom/>)
          :
          (
            searchResults?.map((item, index) => (
            <div key={index}>
            <div className="project-item">
                  <h1 className="project-index">{index + 1}. </h1>
                  <Link
                    to="/data"
                    state={{ item: item._id, from: "search" }}
                    className="project-link"
                  >
                    <div className="project-content">
                      <h1 className="customer-name">{item.customer}</h1>
                      <h1 className="contract-no">{item.contactno}</h1>
                      <h1 className="sl-no">{item.turbineframesr}</h1>
                    </div>
                  </Link>
                  <div className="delete-button">
                    <button onClick={() => handledelete(item._id)}>
                      <MdDeleteForever className="delete-icon" />
                    </button>
                  </div>
                </div>
            </div>
          ))
          )
        )}
      </div>
    </div>
  );
};

export default Search;
