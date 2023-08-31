import React from "react";
import { useState, useEffect } from "react";
import { fetchProject } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Css/search.css";
import { useNavigate } from "react-router-dom";
import ProjectModalForm from "./projectmodal";
import axios  from "axios";

const Search = () => {
  // const nav= useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const projectData = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const [data, setdata] = useState();

  const handleclick = () => {
    console.log("add the project here");
  };

  const handledelete= async(index)=>{
    try {
      await axios.delete(`api/project/${index}`);
      console.log('delete success');
      dispatch(fetchProject());
    } catch (error) {
      console.log("delete failed", error);
    }

  }

  useEffect(() => {
    console.log("working");
    dispatch(fetchProject());
  }, []);

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
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">
          {/* <i className="fa fa-search"></i>
           */}
          Search
        </button>
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
        {projectData?.map((item, index) => (
          <div key={index} >
            <div className="project-item">
            <h1 className="project-index">{index + 1}</h1>
            <Link to='/data' state={{item :item._id, from :"search"}} className="project-link">
              <h1 className="customer-name">{item.customer}</h1>
            </Link>
            <h1 className="sl-no">
              {item.turbineframesr}
            </h1>

            </div>
            <div>
          <button onClick={()=>(handledelete(item._id))}>Delete Project</button>
           
              </div>

          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
